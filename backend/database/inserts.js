let dbConnection;

exports.init = connection => {
    dbConnection = connection;
};

exports.newUser = user => {
    command =
        `INSERT INTO users (email, password, nickname, visibility) ` +
        `VALUES ("${user.email}", "${user.password}", "${user.nickname}", "${user.visibility}");`;
    return dbConnection.execute(command);
};

exports.newAuthentication = async auth => {
    command = `INSERT INTO logins (token, userId) VALUES ("${auth.token}", "${auth.userId}");`;
    // If token allready exist, just update time
    await dbConnection.execute(command).catch(err => {
        command = `UPDATE logins set timestamp=CURRENT_TIMESTAMP WHERE userId="${auth.userId}";`;
        dbConnection.execute(command).catch(() => {
            console.log("There is something wrong with authentication update.");
            console.log(err);
        });
    });
};

exports.newPost = post => {
    post.text = post.text ? `"${post.text}"` : "NULL";
    post.image = post.image ? `"${post.image}"` : "NULL";
    command =
        `INSERT INTO posts (userId, title, text, image, visibility) VALUES` +
        `("${post.userId}", "${post.title}", ${post.text}, ${post.image}, "${post.visibility}");`;
    return dbConnection.execute(command);
};
