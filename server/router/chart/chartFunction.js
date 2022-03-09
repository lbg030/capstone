const chartFunctions = {};
const keys = require("../../keys");
// const db_config = require("../../config");
const { Pool } = require("pg");

const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort,
});

// const pgClient = new Pool({
// 	user: db_config.pgUser,
// 	host: db_config.pgHost,
// 	database: db_config.pgDatabase,
// 	password: db_config.pgPassword,
// 	port: db_config.pgPort,
// });

module.exports = chartFunctions;
