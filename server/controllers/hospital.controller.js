const db = require("../models");
const hospital = db.hospitals;
const Op = db.Sequelize.Op;

// Create and save a new hospital'
exports.create = (req, res) => {
  if (!req.body.addr) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const hospital = {
    addr: req.body.addr,
    XPosWgs84: req.body.XPosWgs84,
    YPosWgs84: req.body.YPosWgs84
  };

  hospital.create(hospital)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hospital.",
      });
    });
};

// Retrieve all hospitals from the database.
exports.findAll = (req, res) => {
  const addr = req.query.addr;
  var condition = addr ? { addr: { [Op.iLike]: `%${addr}%` } } : null;

  hospital.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hospital.",
      });
    });
};

// Find a single hospital with an id
exports.findOne = (req, res) => {
  console.log('라우터 진입');
  const id = req.params.id;

  hospital.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error retrieving hospital with id =" + id,
      });
    });
};

// Update a hospital by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  hospital.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "hospital was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update hospital with id=${id}. Maybe hospital was not found or req.body is empty!`,
        }); 
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating hospital with id= " + id,
      });
    });
};

// Delete a hospital with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  hospital.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "hospital was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete hospital with id =${id}. Maybe hospital' was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete hospital' with id = " + id,
      });
    });
};

// Delete all hospital's from the database.
exports.deleteAll = (req, res) => {
  hospital.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} hospital's were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removingall hospital's.",
      });
    });
};

// Find all published hospital's
exports.findAllPublished = (req, res) => {
  hospital.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hospital's.",
      });
    });
};