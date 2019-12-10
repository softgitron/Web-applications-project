const server = require("../index.js"),
    connect = require("../database/connect"),
    spawn = require("child_process").spawn;

// Presetup for all tests

before(done => {
    server.on("app_started", async function() {
        // Reset database
        // con = connect.getConnection();
        // await con.execute("DELETE FROM friends;");
        // await con.execute("DELETE FROM logins;");
        // await con.execute("DELETE FROM notifications;");
        // await con.execute("DELETE FROM posts;");
        // await con.execute("DELETE FROM users;");
        // Run python generator
        const python = spawn("python3", ["./test/generate_database_data.py"]);

        python.stdout
            .on("data", data => {
                console.log(`stdout: ${data}`);
            })
            .on("close", code => {
                done();
            });
    });
});

// Test order

require("./userTests");
require("./postTests");
require("./searchTests");
