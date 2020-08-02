const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
app.use(bodyParser.json());
// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) console.log(err);
    else console.log("connect to mongoDB success");
  }
);
//routes
const juiceRouter = require("./routes/juice");
const userRouter = require("./routes/user");
const noteRouter = require("./routes/note");
// app.use("/juice", juiceRouter);
// app.use("/", userRouter);
app.use("/CRUD", noteRouter);
app.get("/", (req, res) => {
  try {
    res.send("Wellcome to CRUD");
  } catch (error) {
    res.send("Error");
  }
});
app.listen(process.env.PORT || 5000);
