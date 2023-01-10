const express = require("express");
const appRoute = express.Router();
const batchModel = require("../Model/batch-model");
const batchController = require("../Controller/batch-controller");

// Get all batch i.e "29-A" & "29-B"
appRoute.get("/", batchController.getAllBatch);

// Add new batch
appRoute.post("/", batchController.addBatch);

// Get batch by id
appRoute.get("/:batchId", batchController.getBatchById);

// Add student to the batch.
appRoute.put("/:batchId", batchController.addStudent);

module.exports = appRoute;
