const mapFunctions = {};
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

// 데이터 insert 방법
// INSERT INTO public.location(id, geolocation)
// VALUES (1, point(37.29842255286631, 126.8365379155881));

mapFunctions.getLocation = async () => {
	try {
		result = await pgClient.query("SELECT geolocation FROM Location");
		return result.rows;
	} catch (err) {
		console.log(error);
	}
};

module.exports = mapFunctions;
