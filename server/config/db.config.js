// const keys = require("../keys");

module.exports = {
<<<<<<< Updated upstream
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
=======
  // host: "192.168.50.139", // 창준이형 IP
  host: "192.168.2.5", //이병권 IP
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: "5432",
>>>>>>> Stashed changes
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
