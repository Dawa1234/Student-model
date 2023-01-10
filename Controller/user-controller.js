const userModel = require("../Model/user-Model");
const batchModel = require("../Model/batch-model");
const courseModel = require("../Model/course-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login User
const loginController = (req, res, next) => {
  try {
    userModel
      .findOne({ username: req.body.username })
      .then((user) => {
        if (user == null) {
          let err = new Error("Not registered");
          return next(err);
        }

        bcryptjs.compare(req.body.password, user.password, (err, success) => {
          if (err) return next(err);
          if (!success) {
            let err = new Error("Password not matched");
            return next(err);
          }
          let data = {
            firstname: user.firstname,
            lastname: user.lastname,
            userId: user._id,
            username: user.username,
          };
          jwt.sign(
            data,
            process.env.SECRET,
            { expiresIn: "1d" },
            (err, encoded) => {
              if (err) return next(err);
              res.status(201).json({
                status: "Login Successful",
                token: encoded,
              });
            }
          );
        });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};

// Register User
const registerController = (req, res, next) => {
  try {
    userModel
      .findOne({ username: req.body.username })
      .then((user) => {
        if (user != null) {
          let err = new Error("User already registered");
          return next(err);
        }

        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if (err) return next(err);
          let userData = new userModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            batchId: req.body.batchId,
            course: req.body.course,
            username: req.body.username,
            password: hash,
          });
          userModel
            .create(userData)
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((err) => next(err));
        });
      })
      .catch((err) => next(err));
  } catch (e) {
    next(e);
  }
};
// Get all users/students
const getAllUser = (req, res, next) => {
  let userData = [];
  try {
    userModel
      .find()
      // .populate("batch")
      // .populate("course")
      .then((users) => {
        users.map((item) => {
          // if (item.batch) {
          //   userData.push(item);
          // }
        });
        res.status(201).json(users);
      })
      .catch((err) => next(err));
  } catch (e) {
    return next(e);
  }
};

// Upload Image
const uploadImage = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.params.profileId, { $set: req.body }, { new: true })
    .then((user) => {
      user.image = req.file.filename;
      res.status(201).json(user);
    })
    .catch((err) => next(err));
};

// Update a user/student
const userById = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.params.profileId)
    .populate("batch")
    .populate("course")
    .then((user) => {
      // Get the Coursename from the course model.
      let course = user.course.map((item) => {
        return item.course;
      });
      res.status(201).json({
        userId: user._id,
        username: user.username,
        batch: user.batch.batch,
        course: course,
      });
    })
    .catch((err) => next(err));
};

// Update a user/student
const updateUser = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.params.profileId, { $set: req.body }, { new: true })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => next(err));
};

// Add batch
const addBatch = (req, res, next) => {
  userModel
    .findById(req.params.profileId)
    .then((user) => {
      // For batch
      batchModel
        .findById(req.params.batchId) // Get batch from batchModel
        .then((batch) => {
          // Check if studentId already exist in the batch.
          if (batch.student.includes(req.params.profileId)) {
            let err = new Error("Batch already added");
            return next(err);
          }
          batch.student.push(req.params.profileId);
          batch.save();
          res.status(201).json(user);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
// Add Course
const addCourse = (req, res, next) => {
  let userId = req.params.profileId;
  userModel
    .findById(req.params.profileId)
    .then((user) => {
      // Map course
      req.body.course.map((item) => {
        courseModel // Course Model
          .findById(item) // Find each course by id
          .then((course) => {
            // If the course does not contains the student then only add and save.
            if (!course.student.includes(userId)) {
              // push only for 1 item
              // concat only for multiple item
              course.student.push(userId);
              course.save();
            }
            // If the student did not added the course then only add and save.
            if (!user.course.includes(item)) {
              user.course.push(item);
              user.save();
            }
          })
          .catch((err) => next(err));
      });
      res.status(201).json(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  getAllUser,
  loginController,
  registerController,
  uploadImage,
  updateUser,
  userById,
  addCourse,
  addBatch,
};
