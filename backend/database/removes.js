let dbConnection;

exports.init = connection => {
    dbConnection = connection;
};

exports.revokeToken = token => {
    command = `DELETE FROM logins WHERE token="${token}";`;
    return dbConnection.execute(command);
};
