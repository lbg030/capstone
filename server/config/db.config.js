const keys = require("../keys");

module.exports = {
  HOST: keys.pgHost,
  USER: keys.pgUser,
  PASSWORD: keys.pgPassword,
  database: keys.pgDatabase,
  port: keys.pgPort,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "password",
//   DB: "covid",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
