const express = require("express");
const appRoute = express.Router();
const courseController = require("../Controller/course-controller");

appRoute.post("/", courseController.addCourse);

appRoute.get("/", courseController.allCourse);

appRoute.get("/:courseId", courseController.courseById);

module.exports = appRoute;
