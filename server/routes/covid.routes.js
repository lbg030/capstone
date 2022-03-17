module.exports = (app) => {
    const covid = require("../controllers/covid.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", covid.create);
  
    // Retrieve all Tutorial
    router.get("/", covid.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/id", covid.findOne);
  
    // Update a Tutorial with id
    router.post("/id", covid.update);
  
    // Delete a Tutorial with id
    router.delete("/id", covid.delete);
  
    // Delete all Tutorial
    router.delete("/", covid.deleteAll);
  
    app.use("/api/covid", router);
  };