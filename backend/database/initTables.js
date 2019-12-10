const fs = require("fs");
const path = require("path");

exports.initTables = (dbConnection, dbName) => {
    // Init table structure based on tableGeneration.sql file
    // https://stackoverflow.com/questions/44600943/fs-readfilesync-is-not-file-relative-node-js
    const filePath = path.resolve(__dirname, "./tableGeneration.sql");
    let commands = fs.readFileSync(filePath, "utf8");
    commands = commands.replace(/chirpdb/g, dbName).trim();
    commands = commands.split("\n\n");
    for (command of commands) {
        dbConnection.execute(command).catch(err => {
            console.log("Error creating databases! Exiting...");
            console.log(err);
            process.exit(2);
        });
    }
};
