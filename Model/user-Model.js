const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batchModel",
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
    },
  ],
});
module.exports = mongoose.model("userModel", userSchema);
