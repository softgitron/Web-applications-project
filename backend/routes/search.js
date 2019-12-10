const express = require("express");
const router = express.Router();
const { sanitizeBody, body, check, validationResult } = require("express-validator");

const constants = require("../constants");
const searchController = require("../controllers/searchController");

/**
 * @api {post} /search/fuzzy Search for a public posts or user with a string
 * @apiVersion 1.0.0
 * @apiName fuzzy
 * @apiGroup Search
 *
 * @apiHeader {String} [x-access-token] authentication token of the session. (Can be supplied via cookie too.)
 * @apiParam {Number{0..}} [postAfterId] Get posts after specific id
 * @apiParam {Number{0..}} [userAfterId] Get posts after specific id
 * @apiParam {Number{1..100}} [resultsCount] How many results there should be (same amount for users and posts)
 * @apiParam {String{3..160}} query Free form search query
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "lastUserId":32,
 *   "lastPostId":47,
 *   "users":[
 *      {
 *         "userId":81,
 *         "nickname":"dynamic",
 *         "profilePicture":"None",
 *         "visibility":1
 *      },
 *      {
 *         "userId":63,
 *         "nickname":"cheque",
 *         "profilePicture":"None",
 *         "visibility":1
 *      },
 *      {
 *         "userId":32,
 *         "nickname":"sell",
 *         "profilePicture":"None",
 *         "visibility":1
 *      }
 *   ],
 *   "posts":[
 *      {
 *         "postId":89,
 *         "userId":89,
 *         "nickname":"plaintiff",
 *         "timestamp":"2019-12-06T16:21:25.000Z",
 *         "title":"preparation orchestra fashion state",
 *         "text":"hierarchy shadow satisfaction emergency",
 *         "image":null
 *      },
 *      {
 *         "postId":73,
 *         "userId":73,
 *         "nickname":"anger",
 *         "timestamp":"2019-12-06T16:21:25.000Z",
 *         "title":"freighter begin viable pluck",
 *         "text":"charity voucher brick effective",
 *         "image":null
 *      },
 *      {
 *         "postId":47,
 *         "userId":47,
 *         "nickname":"earthflax",
 *         "timestamp":"2019-12-06T16:21:25.000Z",
 *         "title":"prisoner soar teacher have",
 *         "text":"material strikebreaker pest mayor",
 *         "image":null
 *      }
 *   ]
 *}
 *
 * @apiError UnknownError Unknown error
 *
 */

router.post(
    "/fuzzy",
    [
        sanitizeBody("*")
            .trim()
            .escape(),
        body("query").isLength({
            min: 3,
            max: 160
        }),
        body("userAfterId")
            .optional()
            .isNumeric({ min: 0 }),
        body("postAfterId")
            .optional()
            .isNumeric({ min: 0 }),
        body("resultsCount")
            .optional()
            .isNumeric({ min: 1, max: 100 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const results = await searchController.doSearch(req);
            return res.status(200).json(results);
        } catch (error) {
            if (error === constants.unknownError) return res.status(500).json({ errors: error });
            return res.status(400).json({ errors: error });
        }
    }
);

module.exports = router;
