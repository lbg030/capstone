// 1. 클라이언트가 axios로 "backend/patient" 요청
// 2. server.js에서 "./router/patient/index" 라우팅 분기
// 3. router.post로 "./ctrl.age" 클라이언트에게 응답
// client -> backend/server.js -> backend/router/patient.js -> backend/ctrl/patient.js -> client

const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const age = async (req, res) => {
  await models.covid
    .findAll({
      attributes: ["id", "age"],
    })
    .then((data) => {
      console.log("=======DATA=========");
      console.log(JSON.stringify(data));
      console.log("======length=======");
      console.log(Object.keys(data).length);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { age };
