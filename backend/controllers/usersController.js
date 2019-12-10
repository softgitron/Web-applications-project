const bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    inserts = require("../database/inserts"),
    queries = require("../database/queries"),
    removes = require("../database/removes");

const privateKey = process.env["WEB_TOKEN_PRIVATE_KEY"];

exports.createUser = async req => {
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    try {
        [results, _] = await inserts.newUser(user);
    } catch (error) {
        const message = error.message;
        if (message.includes("Duplicate entry")) {
            if (message.includes("nickname")) {
                throw "Nickname allready exists";
            } else if (message.includes("email")) {
                throw "Email allready exists";
            }
        }
    }
    try {
        const token = await handleToken(req, results.insertId);
        return {
            header: { "x-access-token": token },
            data: { userId: results.insertId, email: user.email, nickname: user.nickname }
        };
    } catch (error) {
        throw constants.unknownError;
    }
};

exports.authenticate = async req => {
    user = req.body;
    [results, _] = await queries.getUserDetails(user);
    if (results.length === 0) {
        throw "Unknown email address";
    }
    const userD = results[0];
    const check = await bcrypt.compare(user.password, userD.password);
    if (check === false) {
        throw "Password is incorrect";
    }
    const token = await handleToken(req, userD.userId);
    return {
        header: { "x-access-token": token },
        data: { userId: userD.userId, email: userD.email, nickname: userD.nickname }
    };
};

exports.logout = async req => {
    if (req.user.token === undefined) throw "Invalid authentication.";
    try {
        await removes.revokeToken(req.user.token);
        return;
    } catch (error) {
        console.log(error);
        throw constants.unknownError;
    }
};

async function handleToken(req, userId) {
    const timestamp = String(Date.now());
    const token = jwt.sign({ id: userId, timestamp: timestamp }, privateKey);
    req.session.authorization = token;
    await inserts.newAuthentication({ token: token, userId: userId });
    return token;
}
