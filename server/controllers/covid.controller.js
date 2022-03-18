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
exports.findAll = (req, res) => {
  // 해당하는 날짜만 선택
  const stdDay = req.query.stdDay;
  var condition = stdDay ? { stdDay: { [Op.iLike]: `%${stdDay}%` } } : null;

  covid
    .findAll({ where: condition })
    .then((data) => {
      console.log("controller data==========");
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving covid.",
      });
    });
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

// Update a covid by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  covid
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "covid was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update covid with id=${id}. Maybe covid was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating covid with id= " + id,
      });
    });
};

// Delete a covid with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  covid
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "covid was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete covid with id =${id}. Maybe covid' was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete covid' with id = " + id,
      });
    });
};

// Delete all covid's from the database.
exports.deleteAll = (req, res) => {
  covid
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} covid's were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removingall covid's.",
      });
    });
};

// Find all published covid's
exports.findAllPublished = (req, res) => {
  covid
    .findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving covid's.",
      });
    });
};
