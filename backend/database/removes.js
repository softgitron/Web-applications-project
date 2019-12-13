let dbConnection;
const constants = require("../constants");

exports.init = connection => {
    dbConnection = connection;
};

exports.revokeToken = token => {
    command = `DELETE FROM logins WHERE token="${token}";`;
    return dbConnection.execute(command);
};

exports.revokeOldTokens = () => {
    // https://stackoverflow.com/questions/4364913/sql-delete-statement-where-date-is-greater-than-30-days
    command = `DELETE FROM logins WHERE timestamp < DATE_SUB(NOW(), INTERVAL ${constants.tokenMaxTime} DAY);`;
    dbConnection.execute(command);
};
