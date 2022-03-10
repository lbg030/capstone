const keys = require("./keys");
const convert = require('xml-js');
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const covid_data = require('./utils/covid_data')
const hospital_data = require('./utils/hospital_data')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// postgreSQL Sequelize
require("./routes/hospital.routes")(app);

const { sequelize, hospital } = require('./models/index.js');
const models = require('./models');
const res = require('express/lib/response');
const router = require('express').Router();
 
const driver = async () => {
    try {
        await sequelize.sync();
    } catch (err) {
        console.error('초기화 실패');
        console.error(err);
        return;
    }
 
    console.log('초기화 완료.');
};
driver();

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log("PG ERROR", err));
});

//Express route ffefinitions
app.get("/", (req, res) => {
  res.send("Hi");
});

// get the values
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.send(values);
});

// now the post -> insert value
app.post("/values", async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

  res.send({ working: true });
});

app.post('/covid', (req, res)=>{ // 입력 날짜 데이터 가져오기
  covid_data(req.body.location, (error, {covid_data}={})=>{
      console.log('입력값:'+req.body.location);
      if (error){
          return res.send({error})
      }
      return res.send(hospital_data);
  })
} )

app.post('/hospital', (req, res)=>{ // 입력 날짜 데이터 가져오기
  try{
      hospital_data(req.body.pageNo, (error, {hospital_data}={})=>{
        console.log(hospital_data[2]['addr']['_text'])
        return res.json({list : hospital_data});
    })
  } catch(err){
    console.log(err);
  }

});

app.listen(5000, err => {
  console.log("Listening");
});
