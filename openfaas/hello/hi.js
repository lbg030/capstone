"use strict";

const request = require("request");
const convert = require("xml-js");

module.exports = (event, context) => {
  console.log(request, "Req");
  let err;
  const url =
    "http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService?ServiceKey=q%2FSCwFC%2FuzqKd2Ma0fCB4zxA4bYqj9gKj5ekZb4spqyYEXq6ZU9C1Nj5zC%2Fo52v50uyS6kAJ8y0HXYGe%2FmN0QA%3D%3D&pageNo=1&numOfRows=10";
  request(
    {
      url: url,
    },
    function (error, response, body) {
      // console.log("Status", response.statusCode);
      // console.log("Headers", JSON.stringify(response.headers));
      // console.log("Reponse received", body);
      const data = convert.xml2json(body, { compact: true, space: 4 });
      const covid_data = JSON.parse(data).response.body.items.item;
      console.log("================");
      console.log(covid_data, "data");
      const result = {
        status: "You said: " + JSON.stringify(covid_data[0].addr._text),
      };
      return context.status(200).succeed(result);
    }
  );
};
