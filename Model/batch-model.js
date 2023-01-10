const mongoose = require("mongoose");

const batchSchema = mongoose.Schema({
  batch: {
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

module.exports = mongoose.model("batchModel", batchSchema);
