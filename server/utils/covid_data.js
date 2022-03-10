const request = require('request')
const convert = require('xml-js');



const covid_data = (stationName, callback) => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year  + month + day;
    console.log('날짜:' + dateString);

    const url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?';


    var ServiceKey = 'q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D'

    var queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(dateString); //dateString
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(dateString);

    const fullurl = url + queryParams;

    request(fullurl, (error, {body}) => {
        const covid= convert.xml2json(body,{compact:true,spaces:4});
        const covid_data = JSON.parse(covid).response.body.items.item;
        callback(undefined, {            // index.js 의  {covid_data} => 함수로 돌아감
            url:fullurl,
            covid_data:covid_data
        })
    })
}

module.exports = covid_data;
