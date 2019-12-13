const inserts = require("../database/inserts"),
    queries = require("../database/queries"),
    constants = require("../constants");

exports.createPost = async req => {
    let post = req.body;
    post.userId = req.user.id;
    try {
        await inserts.newPost(post);
        return "New post ok";
    } catch (error) {
        console.log("Error happened when creating new post.");
        console.log(error);
        throw constants.unknownError;
    }
};

exports.getPublicPosts = async req => {
    try {
        [results, _] = await queries.getPublicPosts(req.body);
        return { lastId: getLastId(results), posts: results };
    } catch (error) {
        console.log("Error happened when getting public posts.");
        console.log(err);
        throw constants.unknownError;
    }
};

exports.getUserPosts = async req => {
    // Check does user exists and get visibility
    let public;
    [resultsVisibility, _] = await queries.checkIsPublic(req.body.userId);
    if (resultsVisibility.length === 0) {
        throw "User not found";
    } else {
        public = resultsVisibility[0].visibility;
    }
    // If not authorized
    if (req.user.id === -1) {
        if (public === 0) {
            throw "Unauthorized";
        } else {
            [results, _] = await queries.getPublicUserPosts(req.body);
            return { lastId: getLastId(results), posts: results };
        }
    }
    // Is own profile
    else if (req.user.id === Number(req.body.userId)) {
        [results, _] = await queries.getAllUserPosts(req.body);
        return { lastId: getLastId(results), posts: results };
    }
    // Check friendship status
    else {
        const resultsFrienship = await queries.areFriends(req.body.userId, req.user.id);
        const areFriends = resultsFrienship[0].count;
        if (areFriends === 0 && public === 0) {
            throw "Unauthorized";
        } else if (areFriends === 1) {
            [results, _] = await queries.getAllUserPosts(req.body);
            return { lastId: getLastId(results), posts: results };
        } else {
            [results, _] = await queries.getPublicUserPosts(req.body);
            return { lastId: getLastId(results), posts: results };
        }
    }
};

function getLastId(results) {
    return results.length === 0 ? 0 : results[results.length - 1].postId;
}
