const queries = require("../database/queries"),
    constants = require("../constants");

exports.doSearch = async req => {
    let request = req.body;
    request.userId = req.user.id;
    request.query = request.query.toLowerCase();
    let foundUsers;
    let foundPosts;
    try {
        const findUser = queries.findUser(request);
        const findPost = queries.findPost(request);
        [foundUsers, _] = await findUser;
        [foundPosts, _] = await findPost;
    } catch (err) {
        console.log("Unknown error happened while quering for users and posts");
        console.log(err);
        throw constants.unknownError;
    }
    const lastUserId = foundUsers.length === 0 ? 0 : foundUsers[foundUsers.length - 1].userId;
    const lastPostId = foundPosts.length === 0 ? 0 : foundPosts[foundPosts.length - 1].postId;
    return {
        lastUserId: lastUserId,
        lastPostId: lastPostId,
        users: foundUsers,
        posts: foundPosts
    };
};
