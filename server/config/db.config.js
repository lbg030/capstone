// const keys = require("../keys");

// 쿠버네티스 파드
// module.exports = {
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// 도커 컨테이너
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

// 로컬
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
