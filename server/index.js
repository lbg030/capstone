const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query(
      "CREATE TABLE IF NOT EXISTS values (number INT, longitude INT, latitude INT)"
    )
    .catch((err) => console.log("PG ERROR", err));
});

app.get("/", (req, res) => {
  res.send("Hi");
});

//Express route definitions
app.get("/values/all", (req, res) => {
  const values = pgClient.query("SELECT * FROM values", (err, result) => {
    res.send(result);
  });
});

// app.get("/api/get", (req, res) => {
//   const total = pgClient.query("select * from values", (err, result) => {
//     res.send(result);
//   });
// });

app.listen(5000, (err) => {
  console.log("Listening");
});
