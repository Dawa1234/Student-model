const courseModel = require("../Model/course-model");

// Add course
const addCourse = (req, res, next) => {
  courseModel
    .findOne({ course: req.body.course })
    .then((course) => {
      if (course != null) {
        let err = new Error("Course already added");
        return next(err);
      }
      courseModel
        .create(req.body)
        .then((course) => {
          res.status(201).json(course);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// All course
const allCourse = (req, res, next) => {
  courseModel
    .find()
    .then((course) => {
      res.status(201).json(course);
    })
    .catch((err) => next(err));
};
// Course by Id
const courseById = (req, res, next) => {
  courseModel
    .findById(req.params.courseId)
    .then((course) => {
      res.status(201).json(course);
    })
    .catch((err) => next(err));
};

module.exports = {
  addCourse,
  allCourse,
  courseById,
};
