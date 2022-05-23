// const keys = require("../keys");

module.exports = {
  host: "192.168.50.139",
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: "5432",
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
