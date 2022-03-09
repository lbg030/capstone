const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { Pool } = require("pg");
const keys = require("./keys");
// const db_config = require("./config");
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

pgClient.on("connect", (client) => {
	console.log("connect");
	client
		.query(
			"CREATE TABLE IF NOT EXISTS location (id serial primary key, geolocation point not null)"
		)
		.catch((err) => console.log("PG ERROR", err));
});

app.get("/", (req, res) => {
	res.send("Hi");
});

const map = require("./router/map/index.js");
const chart = require("./router/chart/index.js");

app.use("/map", map);
app.use("/chart", chart);

app.listen(5000, (err) => {
	console.log("Listening");
});
