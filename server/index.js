const keys = require("./keys");
const convert = require("xml-js");
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const covid_data = require("./utils/covid_data");
const hospital_data = require("./utils/hospital_data");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// postgreSQL Sequelize
// require("./routes/hospital.routes")(app);

const { sequelize, hospital } = require("./models/index.js");
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

// 라우팅 등록, 분기로 수정하기!!!!!!!!!!!!!!!!
//Express route ffefinitions
app.get("/", (req, res) => {
  res.send("Hi");
});
const { Pool } = require("pg");
const pgClient = new Pool({
  user: "postgres",
  host: "localhost",
  database: "covid",
  password: "password",
  port: 5432,
});

pgClient.connect();

app.get("/api/get", async (req, res) => {
  const total = await pgClient.query("select * from hospitals");
  res.send(total);
});
// get the values

// api
app.post("/covid", (req, res) => {
  // 입력 날짜 데이터 가져오기
  // api 요청 -> 디비 적재
  console.log("index.js body");
  console.log(req.body); // { startCreateDt : 'YYYYMMDD', endCreateDt : 'YYYYMMDD' }
  console.log("=====");
  covid_data(req.body, (error, { covid_data } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log("covid_data ==============");
    console.log(covid_data);
    console.log("============================");
    return res.send(covid_data);
  });
});

app.post("/dataCovid", (req, res) => {
  const ctrl = require("./controllers/covid.controller");
  ctrl.findAll(req.body);
  console.log("hello");
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
