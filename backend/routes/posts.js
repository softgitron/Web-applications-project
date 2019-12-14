const express = require("express");
const router = express.Router();
const { sanitizeBody, body, check, validationResult } = require("express-validator");

const constants = require("../constants");
const postsController = require("../controllers/postsController");

/**
 * @api {post} /posts/newPost Creates new post
 * @apiVersion 1.0.0
 * @apiName newPost
 * @apiGroup Post
 *
 * @apiHeader {String} [x-access-token] authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {String{5..60}} title Title of the post
 * @apiParam {String{0..320}} [text] User post itself.
 * @apiParam {String{60}} [image] Image UUID.
 * @apiParam {Number=0,1} visibility visibility value, 0 for private and 1 for public.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       results: "New post ok"
 *     }
 *
 * @apiError Expired Token has expired
 * @apiError NoTitle Tittle missing
 * @apiError UnknownError Unknown error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       errors: 'Token has expired'
 *     }
 */

router.post(
    "/newPost",
    [
        body("title").isLength({
            min: constants.tittleMinLength,
            max: constants.tittleMaxLength
        }),
        body("text").isLength({
            min: constants.textMinLength,
            max: constants.textMaxLength
        }),
        body("image")
            .optional()
            .isLength({
                min: constants.imageUUIDLength,
                max: constants.imageUUIDLength
            }),
        body("visibility").isNumeric({ min: 0, max: 1 }),
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
            const results = await postsController.createPost(req);
            return res.status(200).json({ results: results });
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

/**
 * @api {post} /posts/getPublicPosts Get at most 100 public posts from random users
 * @apiVersion 1.0.0
 * @apiName getPublicPosts
 * @apiGroup Post
 *
 * @apiParam {Number{0..}} [afterId] Get posts after specific id
 * @apiParam {Number{1..100}} [postCount] How many posts there should be
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       lastId: 52
 *       posts: [{timestamp: 2019-12-06T09:37:36.000Z,
 *                postId: 51,
 *                userId: 1,
 *                nickname: "Mike",
 *                title: "Hello world",
 *                text: "This is my first post",
 *                image: undefined},
 *               {timestamp: 2019-11-06T09:37:36.000Z,
 *                postId: 100,
 *                userId: 2,
 *                nickname: "Johanna"
 *                title: "Hello world 1",
 *                text: "This is my second post",
 *                image: undefined}]
 *     }
 *
 * @apiError UnknownError Unknown error
 *
 */

router.post(
    "/getPublicPosts",
    [
        sanitizeBody("*")
            .trim()
            .escape(),
        body("afterId")
            .optional()
            .isNumeric({ min: 0 }),
        body("postCount")
            .optional()
            .isNumeric({ min: 1, max: 100 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const results = await postsController.getPublicPosts(req);
            return res.status(200).json(results);
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

/**
 * @api {post} /posts/getUserPosts Get at most 100 posts from specific user
 * @apiVersion 1.0.0
 * @apiName getUserPosts
 * @apiGroup Post
 *
 * @apiHeader {String} [x-access-token] authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Numbger{0..}} userId Personal id of the user
 * @apiParam {Number{0..}} [afterId] Get posts after specific id
 * @apiParam {Number{1..100}} [postCount] How many posts there should be
 *
 *
 *
 * @apiError UnknownError Unknown error
 * @apiError Unauthorized You don't have access to this user page
 *
 */

router.post(
    "/getUserPosts",
    [
        sanitizeBody("*")
            .trim()
            .escape(),
        body("userId").isNumeric(),
        body("afterId")
            .optional()
            .isNumeric({ min: 0 }),
        body("postCount")
            .optional()
            .isNumeric({ min: 1, max: 100 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const results = await postsController.getUserPosts(req);
            return res.status(200).json(results);
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            else if (error === "Unauthorized") return res.status(401).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

module.exports = router;
