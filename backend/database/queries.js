let dbConnection;

exports.init = connection => {
    dbConnection = connection;
};

exports.checkToken = user => {
    command = `Select Count(*) AS "count" FROM logins WHERE userId="${user.id}" and token="${user.token}";`;
    return dbConnection.execute(command);
};

exports.getUserDetails = user => {
    if (user.id) {
        command = `Select * FROM users WHERE userId="${user.id}";`;
    } else {
        command = `Select * FROM users WHERE email="${user.email}";`;
    }
    return dbConnection.execute(command);
};

exports.getPublicPosts = request => {
    if (request.postCount === undefined) request.postCount = 10;
    if (request.afterId === undefined) {
        command =
            `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
            `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE posts.visibility=1 ` +
            `AND users.visibility=1 ORDER BY posts.postId DESC limit ${request.postCount};`;
    } else {
        command =
            `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
            `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE posts.visibility=1 ` +
            `AND users.visibility=1 AND posts.postId<${request.afterId} ORDER BY posts.postId DESC limit ${request.postCount};`;
    }
    return dbConnection.execute(command);
};

exports.checkIsPublic = id => {
    command = `Select visibility FROM users WHERE userId="${id}";`;
    return dbConnection.execute(command);
};

exports.getAllUserPosts = request => {
    if (request.postCount === undefined) request.postCount = 10;
    if (request.afterId === undefined) request.afterId = 2147483647;
    command =
        `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
        `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE users.userId=${request.userId} ` +
        `AND posts.postId<${request.afterId} ORDER BY posts.postId DESC limit ${request.postCount};`;
    return dbConnection.execute(command);
};

exports.getPublicUserPosts = request => {
    if (request.postCount === undefined) request.postCount = 10;
    if (request.afterId === undefined) request.afterId = 2147483647;
    command =
        `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
        `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE users.userId=${request.userId} ` +
        `AND posts.visibility=1 AND posts.postId<${request.afterId} ORDER BY posts.postId DESC limit ${request.postCount};`;

    return dbConnection.execute(command);
};

exports.areFriends = (userId1, userId2) => {
    command =
        `SELECT COUNT(*) AS "count" FROM chirpdb.friends WHERE userId1=${userId1} AND userId2=${userId2} ` +
        `AND confirmed=true OR userId1=${userId2} AND userId2=${userId1} AND confirmed=true;`;
    return dbConnection.execute(command);
};

exports.findUser = request => {
    if (request.resultsCount === undefined) request.resultsCount = 10;
    if (request.userAfterId === undefined) request.userAfterId = 2147483647;
    command =
        `SELECT userId, nickname, profilePicture, visibility FROM chirpdb.users WHERE (lower(nickname) LIKE "%${request.query}%" ` +
        `OR lower(email) LIKE "%${request.query}%") AND userId<${request.userAfterId} ORDER BY userId DESC limit ${request.resultsCount};`;
    return dbConnection.execute(command);
};

exports.findPost = request => {
    if (request.resultsCount === undefined) request.resultsCount = 10;
    if (request.postAfterId === undefined) request.postAfterId = 2147483647;
    if (request.userId === -1) {
        command =
            `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
            `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE (lower(title) LIKE "%${request.query}%" OR lower(text) LIKE "%${request.query}%") ` +
            `AND posts.visibility=1 AND posts.postId<${request.postAfterId} ORDER BY posts.postId DESC limit ${request.resultsCount};`;
    } else {
        command =
            `SELECT posts.postId, posts.userId, users.nickname, posts.timestamp, posts.title, posts.text, posts.image ` +
            `FROM chirpdb.posts INNER JOIN users ON posts.userId=users.userId WHERE (lower(title) LIKE "%${request.query}%" OR lower(text) LIKE "%${request.query}%") ` +
            `AND (posts.visibility=1 OR posts.userId=${request.userId}) AND posts.postId<${request.postAfterId} ORDER BY posts.postId DESC limit ${request.resultsCount};`;
    }
    return dbConnection.execute(command);
};
