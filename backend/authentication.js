//medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

const jwt = require("jsonwebtoken");
const queries = require("./database/queries");

const privateKey = process.env["WEB_TOKEN_PRIVATE_KEY"];

module.exports = function(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    req.user = {};
    // Check for token in the cookie
    if (!token) {
        if (req.session.authorization) token = req.session.authorization;
        else {
            returnError(req, "UNAUTHORIZED");
            next();
            return;
        }
    }
    // console.log("Serverside token " + token);
    let decoded;
    try {
        //if can verify the token, set req.user and pass to next middleware
        decoded = jwt.verify(token, privateKey);
    } catch (ex) {
        returnError(req, "INVALID");
        next();
        return;
    }
    // If decoding somehow failed without error
    if (decoded === undefined) {
        returnError(req, "INVALID");
        next();
        return;
    }
    // Check token is still valid
    queries
        .checkToken({ id: decoded.id, token: token })
        .then(([results, fields]) => {
            if (results[0].count === 1) {
                req.user = decoded;
                req.user.token = token;
                next();
                return;
            } else {
                req.session = null;
                if (req.path === "/users/authenticate") {
                    req.user.authorization = "UNAUTHORIZED";
                    req.user.id = -1;
                    next();
                    return;
                } else {
                    return res.status(401).json({ errors: "Token has expired." });
                }
            }
        })
        .catch(err => {
            return res.status(500).json({ errors: "Authentication isn't working properly" });
        });
};

function returnError(req, type) {
    req.user.authorization = type;
    req.user.id = -1;
    req.user.token = undefined;
}
