module.exports = (app) => {
  const covid = require("../controllers/covid.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/", covid.create);

  // Retrieve all Tutorial
  router.post("/", covid.findAll);
};
