"use strict";

const express = require("express"),
    cookieSession = require("cookie-session"),
    cookieParser = require("cookie-parser"),
    cors = require("cors"),
    https = require("https"),
    fs = require("fs"),
    constants = require("./constants"),
    authentication = require("./authentication.js"),
    dbConnect = require("./database/connect"),
    inserts = require("./database/inserts"),
    queries = require("./database/queries"),
    removes = require("./database/removes");

let WEB_TOKEN_PRIVATE_KEY = process.env["WEB_TOKEN_PRIVATE_KEY"];
let CORS_SITES = process.env["CORS_SITES"];

if (!WEB_TOKEN_PRIVATE_KEY) {
    console.log("Environment variables (WEB_TOKEN_PRIVATE_KEY) must be set!");
    process.exit(1);
}

if (WEB_TOKEN_PRIVATE_KEY.startsWith("/")) {
    WEB_TOKEN_PRIVATE_KEY = fs.readFileSync(WEB_TOKEN_PRIVATE_KEY, "utf8").trim();
}

if (CORS_SITES.startsWith("/")) {
    CORS_SITES = fs.readFileSync(CORS_SITES, "utf8").trim();
}

CORS_SITES = CORS_SITES.split(" ");

const app = express();

// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
app.use(
    cors({
        credentials: true,
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (CORS_SITES.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.set("trust proxy", 1);
app.use(
    cookieSession({
        name: "session",
        keys: ["secret", process.env["WEB_TOKEN_PRIVATE_KEY"]],
        // Cookie expires after browser close
        expires: false
    })
);
app.use(cookieParser());

app.use(authentication);

// Redirection for main site
app.get("/", (req, res) => {
    res.send("You should not be on this page!\n");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const searchRouter = require("./routes/search");

// Initialize routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/search", searchRouter);

function makeConnection() {
    dbConnect
        .initDb()
        .then(con => {
            inserts.init(con);
            queries.init(con);
            removes.init(con);
            setInterval(removes.revokeOldTokens, 1000 * 20 * constants.tokenCleanUpInterval);
            // Small delay to make sure database is ready
            setTimeout(init_listen, 500);
        })
        .catch(err => {
            console.log(err);
            console.log("Exiting now...");
            process.exit(1);
        });
}

function init_listen() {
    // https://flaviocopes.com/how-to-check-if-file-exists-node/
    try {
        if (fs.existsSync("server.key") && fs.existsSync("server.cert")) {
            https
                .createServer(
                    {
                        key: fs.readFileSync("server.key"),
                        cert: fs.readFileSync("server.cert")
                    },
                    app
                )
                .listen(process.env["BACKEND_PORT"]);
            console.log(
                `Running on https://${process.env["BACKEND_ADDRESS"]}:${process.env["BACKEND_PORT"]}`
            );
        } else {
            console.log("Warning: server.key or server.cert not found. Running without https.");
            app.listen(process.env["BACKEND_PORT"], process.env["BACKEND_ADDRESS"]);
            console.log(
                `Running on http://${process.env["BACKEND_ADDRESS"]}:${process.env["BACKEND_PORT"]}`
            );
        }
    } catch (err) {
        console.log(err);
        process.exit(10);
    }
    app.emit("app_started");
}

// setTimeout(makeConnection, 8000);
makeConnection();

module.exports = app;
