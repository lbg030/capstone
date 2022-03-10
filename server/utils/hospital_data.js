const { database } = require('pg/lib/defaults');
const request = require('request')
const convert = require('xml-js');

const express = require('express')
const app = express ();
require("../routes/hospital.routes")(app);
const { REPL_MODE_SLOPPY } = require('repl');
// db.sequelize.sync();

const { sequelize, covid } = require('../models/index.js');
const models = require('../models');
const res = require('express/lib/response');
const router = require('express').Router();

const hospital_data = (stationName, callback) => {

    const url = 'http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService?';


    var ServiceKey = 'q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D'

    var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');

    const fullurl = url + queryParams;

    request(fullurl, (error, {body} )  => {
        const hospital= convert.xml2json(body,{compact:true,spaces:4});
        const hospital_data = JSON.parse(hospital).response.body.items.item;
        params = {
            addr:hospital_data[0]['addr']['_text'],
            XPosWgs84:hospital_data[0]['XPosWgs84']['_text'],
            YPosWgs84:hospital_data[0]['YPosWgs84']['_text']
        };
        models.hospital.create(params);
        console.log("저장 완료");
        router.post("/")
        callback(undefined, {            // index.js 의  {hospital_data} => 함수로 돌아감
            url:fullurl,
            hospital_data:hospital_data
        })
    })
}

module.exports = hospital_data;
