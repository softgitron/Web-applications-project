// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules

module.exports = Object.freeze({
    hostAddress: "0.0.0.0",
    hostPort: 4040,
    maxConnectionAttempts: 10,
    reTryTime: 15,
    requiredTableNames: ["Users", "Logins", "Friends", "Posts", "Notifications"],
    passwordMinLength: 4,
    passwordMaxLength: 72,
    nicknameMinLength: 4,
    nicknameMaxLength: 20,
    tittleMinLength: 5,
    tittleMaxLength: 60,
    textMinLength: 0,
    textMaxLength: 160,
    imageUUIDLength: 60,
    unknownError: "Unknown error"
});
