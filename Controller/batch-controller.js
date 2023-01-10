const batchModel = require("../Model/batch-model");

const getAllBatch = (req, res, next) => {
  batchModel
    .find()
    .populate("student")
    .then((batches) => {
      res.status(201).json(batches);
    })
    .catch((e) => next(e));
};

const addBatch = (req, res, next) => {
  batchModel
    .create(req.body)
    .then((batch) => {
      res.status(201).json(batch);
    })
    .catch((err) => next(err));
};

const getBatchById = (req, res, next) => {
  batchModel
    .findById(req.params.batchId)
    // .populate("student")
    .then((batch) => {
      res.status(201).json(batch);
    })
    .catch((err) => next(err));
};

const addStudent = (req, res, next) => {
  batchModel
    .findById(req.params.batchId)
    .then((batch) => {
      batch.student.push(req.body.student);
      batch
        .save()
        .then((updatedBatch) => {
          res.status(201).json(updatedBatch);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
module.exports = {
  getAllBatch,
  addBatch,
  getBatchById,
  addStudent,
};
