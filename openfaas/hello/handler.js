"use strict";

const request = require("request");
const convert = require("xml-js");

// const { Pool } = require("pg");
// const pgClient = new Pool({
//   user: "postgres",
//   host: "192.168.50.139",
//   database: "postgres",
//   password: "postgres",
//   port: "5432",
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

module.exports = (event, context) => {
  console.log(request, "Req");
  let err;
  const url =
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?";
  var ServiceKey =
    "q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D";

  var queryParams = encodeURIComponent("ServiceKey") + "=" + ServiceKey;
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10");
  queryParams +=
    "&" +
    encodeURIComponent("startCreateDt") +
    "=" +
    encodeURIComponent("20220510"); //dateString body.date
  queryParams +=
    "&" +
    encodeURIComponent("endCreateDt") +
    "=" +
    encodeURIComponent("20220510");

  const fullurl = url + queryParams;

  request(
    {
      url: fullurl,
    },
    function (error, response, body) {
      // console.log(body);
      // console.log("Status", response.statusCode);
      // console.log("Headers", JSON.stringify(response.headers));
      const covid = convert.xml2json(body, { compact: true, spaces: 4 }); // JSON으로 변경
      const covid_data = JSON.parse(covid).response.body.items.item; // 가공한 데이터
      let params;
      for (var i = 0; i < covid_data.length; i++) {
        params = {
          stdDay: covid_data[i]["stdDay"]["_text"],
          gubun: covid_data[i]["gubun"]["_text"],
          defCnt: covid_data[i]["defCnt"]["_text"],
          deathCnt: covid_data[i]["deathCnt"]["_text"],
        };
        models.covids.create(params);
        console.log(params);
      }
      const result = {
        status: "You said: " + JSON.stringify(covid_data[0].stdDay._text),
      };
      return context.status(200).succeed(result);
    }
  );
};
