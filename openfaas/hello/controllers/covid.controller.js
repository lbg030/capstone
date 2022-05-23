const db = require("../models");
const covid = db.covids;
const Op = db.Sequelize.Op;

// Create and save a new covid'
exports.create = (req, res) => {
  if (!req.body.createDt) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const covid = {
    stdDay: req.body.stdDay,
    gubun: req.body.gubun,
    defCnt: req.body.defCnt,
    deathCnt: req.body.deathCnt,
  };

  covid
    .create(covid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the covid.",
      });
    });
};

// Retrieve all covids from the database.
exports.findAll = async (req, res) => {
  try {
    // console.log(req.date);   // 20220317
    const str = req.date;
    const year = str.substr(0, 4) + "년 ";
    const month = str.substr(4, 2) + "월 ";
    const date = str.substr(6, 2) + "일 ";
    const stdDay = year + month + date + "00시";

    const data = await covid.findAll({
      // raw: true,
      where: {
        stdDay: stdDay,
      },
    });
    // console.log("===data====");
    // console.log(data);
    return data;
    // return res.send(data);
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Find a single covid with an id
exports.findOne = (req, res) => {
  console.log("라우터 진입");
  const id = req.params.id;

  covid
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error retrieving covid with id =" + id,
      });
    });
};
