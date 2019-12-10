const express = require("express");
const router = express.Router();
const { sanitizeBody, body, check, validationResult } = require("express-validator");

const constants = require("../constants");
const userController = require("../controllers/usersController");

/**
 * @api {post} /users/createNewUser Creates new user
 * @apiVersion 1.0.0
 * @apiName createNewUser
 * @apiGroup User
 *
 * @apiParam {String{5..100}} email User email address
 * @apiParam {String{4..72}} password User personal password.
 * @apiParam {String{4..20}} nickname User preferred Nickname.
 * @apiParam {Number=0,1} visibility visibility value, 0 for private and 1 for public.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userId": 100,
 *       "email": "example@mail.com",
 *       "password": "Hello world",
 *       "nickname": "John",
 *     }
 *
 * @apiError SameNickname Nickname allready exists.
 * @apiError SameEmail Email allready exists.
 * @apiError UnknownError Unknown error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       errors: 'Email allready exists'
 *     }
 */

// https://express-validator.github.io/docs/

router.post(
    "/createNewUser",
    [
        sanitizeBody("*")
            .trim()
            .escape(),
        body("email").isEmail(),
        body("password").isLength({
            min: constants.passwordMinLength,
            max: constants.passwordMaxLength
        }),
        body("nickname").isLength({
            min: constants.nicknameMinLength,
            max: constants.nicknameMaxLength
        }),
        body("visibility").isNumeric({ min: 0, max: 1 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const results = await userController.createUser(req);
            res.set(results.header);
            return res.status(200).json(results.data);
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

/**
 * @api {post} /users/authenticate Authenticates with email address and password
 * @apiVersion 1.0.0
 * @apiName authenticate
 * @apiGroup User
 *
 * @apiParam {String{5..100}} email User email address
 * @apiParam {String{4..72}} password User personal password.
 *
 *
 * @apiHeaderExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU3NTU3MDA0NX0.12Mc9OoqYj3Lt3ATFvo_SK825_MC_2hM40YcpDipMKs"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userId": 100,
 *       "email": "example@mail.com",
 *       "password": "Hello world",
 *       "nickname": "John",
 *     }
 *
 * @apiError EmailIncorrect Unknown email address
 * @apiError PasswordIncorrect Password was incorrect
 * @apiError UnknownError Unknown error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       errors: "Password is incorrect"
 *     }
 */

// https://express-validator.github.io/docs/

router.post(
    "/authenticate",
    [
        sanitizeBody("*")
            .trim()
            .escape(),
        body("email").isEmail(),
        body("password").isLength({
            min: constants.passwordMinLength,
            max: constants.passwordMaxLength
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            results = await userController.authenticate(req);
            res.set(results.header);
            return res.status(200).json(results.data);
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

/**
 * @api {post} /users/lougout Revokes user token from authentication table
 * @apiVersion 1.0.0
 * @apiName logout
 * @apiGroup User
 *
 *
 *
 * @apiHeaderExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU3NTU3MDA0NX0.12Mc9OoqYj3Lt3ATFvo_SK825_MC_2hM40YcpDipMKs"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       results: "Logout ok"
 *     }
 *
 * @apiError IncorrectToken Token was not found from the database
 * @apiError Unauthorized No valid token.
 *
 */

router.post(
    "/logout",
    [
        sanitizeBody("*")
            .trim()
            .escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.user.id === -1) {
            return res.status(401).json({ errors: "Unauthorized" });
        }
        try {
            await userController.logout(req);
            return res
                .clearCookie(["session"], { path: "/" })
                .status(200)
                .json({ results: "Logout ok" });
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

module.exports = router;
