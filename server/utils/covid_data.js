const request = require('request')
const convert = require('xml-js');

const express = require('express')
const app = express ();
require("../routes/covid.routes")(app);
const { REPL_MODE_SLOPPY } = require('repl');
// db.sequelize.sync();

const { sequelize, covid } = require('../models/index.js');
const models = require('../models');
const res = require('express/lib/response');
const router = require('express').Router();


const covid_data = (body, callback) => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year  + month + day;
    console.log('날짜:' + dateString);
    console.log('body : '+ body)

    const url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?'


    var ServiceKey = 'q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D'

    var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(body.startCreateDt); //dateString
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(body.endCreateDt);

    const fullurl = url + queryParams;

    request(fullurl, (error, {body}) => {
        const covid= convert.xml2json(body,{compact:true,spaces:4});
        const covid_data = JSON.parse(covid).response.body.items.item;
        for(var i = 0; i< covid_data.length;i++){
            params = {
                stdDay:covid_data[i]['stdDay']['_text'],
                gubun:covid_data[i]['gubun']['_text'],
                defCnt:covid_data[i]['defCnt']['_text'],
                deathCnt:covid_data[i]['deathCnt']['_text']
            };
            models.covids.create(params);
            console.log(i+1 + "번째 저장 완료");
            router.post("/")
        }
        callback(undefined, {            // index.js 의  {covid_data} => 함수로 돌아감
            url:fullurl,
            covid_data:covid_data
        })
    })
}

module.exports = covid_data;
