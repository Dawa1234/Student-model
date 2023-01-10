const express = require("express");
const appRoute = express.Router();
const userController = require("../Controller/user-controller");
const uploadImage = require("../Uploader/uploadFunction");
const { verifyUser } = require("../Verification/verifyUser");

// Get all user
appRoute.get("/", verifyUser, userController.getAllUser);

// Register
appRoute.post("/register", userController.registerController);

// Login
appRoute.post("/login", userController.loginController);

//   Update student
appRoute.put("/:profileId", userController.updateUser);

//   Add batch
appRoute.post("/:profileId/batch/:batchId", userController.addBatch);
//   Update course
appRoute.post("/:profileId/course", userController.addCourse);

//   By Id
appRoute.get("/:profileId", userController.userById);

// Upload Image
appRoute.put(
  "/upload/:profileId",
  verifyUser,
  uploadImage.single("profile"),
  userController.uploadImage
);

module.exports = appRoute;
