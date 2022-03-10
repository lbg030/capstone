module.exports = (app) => {
    const hospital = require("../controllers/hospital.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", hospital.create);
  
    // Retrieve all Tutorial
    router.get("/", hospital.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", hospital.findOne);
  
    // Update a Tutorial with id
    router.post("/:id", hospital.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", hospital.delete);
  
    // Delete all Tutorial
    router.delete("/", hospital.deleteAll);
  
    app.use("/api/hospital", router);
  };