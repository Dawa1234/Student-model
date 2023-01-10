const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
});

module.exports = mongoose.model("courseModel", courseSchema);
