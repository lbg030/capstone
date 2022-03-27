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
exports.findAll = async () => {
  // const startDate = req.body.startCreateDt;
  // const endDate = req.body.endCreateDt;

  console.log("시작 날짜 in controller 파일=====");
  // console.log(startDate);

  // const data = await covid.findAll({
  //   raw: true,
  //   where: {
  //     // 여러 날짜 수정
  //     stdDay: startDate,
  //   },
  // });
  // if (data[0]) {
  //   console.log(data[0], "check");
  //   res.send(data[0]);
  // } else {
  //   res.status(400).send();
  // }

  // 해당하는 날짜만 선택
  // const stdDay = req.query.stdDay;
  // var condition = stdDay ? { stdDay: { [Op.iLike]: `%${stdDay}%` } } : null;

  // covid
  //   .findAll({ where: condition })
  //   .then((data) => {
  //     console.log("controller data==========");
  //     console.log(data);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while retrieving covid.",
  //     });
  //   });
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
