// 1. 클라이언트가 axios로 "backend/patient" 요청
// 2. server.js에서 "./router/patient/index" 라우팅 분기
// 3. router.post로 "./ctrl.age" 클라이언트에게 응답
// client -> backend/server.js -> backend/router/patient.js -> backend/ctrl/patient.js -> client

const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("./models");

// body-parser
app.use(express.json());

// cors
app.use(cors());

models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("DB 연결 실패");
    console.log(err);
  });

// /backend/patient/age
const patient = require("./router/patient");
app.use("/backend/patient", patient);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
