// https://www.w3schools.com/nodejs/nodejs_mysql.asp

const constants = require("../constants");
const init = require("./initTables");
const mysql = require("mysql2");
const fs = require("fs");

const MYSQL_HOST = process.env["MYSQL_HOST"];
const MYSQL_PORT = process.env["MYSQL_PORT"];
const MYSQL_USER = process.env["MYSQL_USER"];
const MYSQL_DATABASE = process.env["MYSQL_DATABASE"];
let MYSQL_PASSWORD = process.env["MYSQL_PASSWORD"];

//Fix docker secrets
if (MYSQL_PASSWORD === undefined) {
    console.log("There is something wrong with environment variables. Exiting...");
    process.exit(5);
}
if (MYSQL_PASSWORD.startsWith("/")) {
    MYSQL_PASSWORD = fs.readFileSync(MYSQL_PASSWORD, "utf8").trim();
}

const pool = mysql
    .createPool({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        database: MYSQL_DATABASE,
        password: MYSQL_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    .promise();

exports.getConnection = () => {
    return pool;
};

exports.initDb = () => {
    return initDbRetry(
        () => pool.query("SHOW TABLES"),
        constants.maxConnectionAttempts,
        constants.reTryTime * 1000
    );
};

// https://gist.github.com/briancavalier/842626
function initDbRetry(fn, retriesLeft, interval) {
    // Try to retrieve table information couple of times
    return new Promise((resolve, reject) => {
        fn()
            .then(([results, fields]) => {
                checkTables(results, fields);
                resolve(pool);
            })
            .catch(error => {
                setTimeout(() => {
                    console.log(
                        `Connection attempt #${constants.maxConnectionAttempts -
                            retriesLeft} failed. Retrying after ${constants.reTryTime} seconds.`
                    );
                    if (retriesLeft === 1) {
                        console.log(
                            `Connection failed ${constants.maxConnectionAttempts} times in a row.`
                        );
                        reject(error);
                    }
                    initDbRetry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}

function checkTables(results, fields) {
    const tablePrefix = `Tables_in_${MYSQL_DATABASE}`;
    // https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    tableNames = results.map(row => {
        return row[tablePrefix];
    });
    for (name of constants.requiredTableNames) {
        if (!tableNames.includes(name)) {
            init.initTables(pool, MYSQL_DATABASE);
            return;
        }
    }
    console.log("Database contains all necessary tables!");
}
