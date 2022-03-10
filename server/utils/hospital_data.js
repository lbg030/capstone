const { database } = require('pg/lib/defaults');
const request = require('request')
const convert = require('xml-js');



const hospital_data = (stationName, callback) => {

    const url = 'http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService?';


    var ServiceKey = 'q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D'

    var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');

    const fullurl = url + queryParams;

    request(fullurl, (error, {body}) => {
        const hospital= convert.xml2json(body,{compact:true,spaces:4});
        const hospital_data = JSON.parse(hospital).response.body.items.item;
        callback(undefined, {            // index.js 의  {hospital_data} => 함수로 돌아감
            url:fullurl,
            hospital_data:hospital_data
        })
    })
}

module.exports = hospital_data;
