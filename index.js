require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./Route/user-route");
const batchRoute = require("./Route/batch-route");
const courseRoute = require("./Route/course-route");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/user")
  .then(() => {
    console.log("Connected to Database successfully!");
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/user", userRoute);
app.use("/batch", batchRoute);
app.use("/course", courseRoute);

app.use((err, req, res, next) => {
  if (err) res.status(500).json({ Error: err.message });
});

app.listen(3000, () => {
  console.log("Our applicaion is running in 3000");
});
