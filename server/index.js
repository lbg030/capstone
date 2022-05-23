const keys = require("./keys");
const convert = require("xml-js");
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const covid_data = require("./utils/covid_data");
const hospital_data = require("./utils/hospital_data");
const ctrl = require("./controllers/covid.controller");
const hos_ctrl = require("./controllers/hospital.controller");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// postgreSQL Sequelize
// require("./routes/hospital.routes")(app);

const { sequelize } = require("./models/index.js");
const models = require("./models");
const res = require("express/lib/response");
const router = require("express").Router();

const driver = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error("초기화 실패");
    console.error(err);
    return;
  }
  console.log("초기화 완료.");
};
driver();
// const { Pool } = require("pg");
// const db_config = require("./config/db.config");
// const pgClient = new Pool({
//   user: db_config.user,
//   host: db_config.host,
//   database: db_config.database,
//   password: db_config.password,
//   port: db_config.port,
// });

// function connectPG() {
//   try {
//     pgClient.connect();
//     console.log("PG connected");
//   } catch (err) {
//     console.log("error");
//   }
// }

// connectPG();

// 라우팅 등록, 분기로 수정하기!!!!!!!!!!!!!!!!
//Express route ffefinitions
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/hospital", async (req, res) => {
  const total = await pgClient.query("select * from hospitals");
  res.send(total);
});
// get the values

// api
app.post("/covid", (req, res) => {
  // 입력 날짜 데이터 가져오기
  // console.log("입력된 date" + req.body.date); // { startCreateDt : 'YYYYMMDD', endCreateDt : 'YYYYMMDD' }
  console.log("covid api접근");
  covid_data(req.body, (error, { covid_data } = {}) => {
    if (error) {
      return res.send({ error });
    }
    // console.log("covid_data ==============");
    // console.log(covid_data);
    return res.send(covid_data);
  });
});

app.post("/dataCovid", async (req, res) => {
  try {
    const data = await ctrl.findAll(req.body);
    JSON.stringify(data);
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.post("/hospital", (req, res) => {
  // 입력 날짜 데이터 가져오기
  try {
    hospital_data(req.body, (error, { hospital_data } = {}) => {
      return res.json({ list: hospital_data });
    });
  } catch (err) {
    console.log(err);
  }
});

// 라우팅 등록
// const dataCovid = require("./routes/covid.routes");
// // 라우팅 분기
// app.use("/dataCovid", dataCovid);

// 라우팅 등록
const hospitals = require("./routes/hospital.routes");
// 라우팅 분기
app.use("/api/hospital", hospitals);

app.listen(3002, (err) => {
  console.log("Listening");
});
