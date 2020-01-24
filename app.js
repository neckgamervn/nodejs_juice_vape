const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
app.use(bodyParser.json());
//routes
const juiceRouter = require("./routes/juice");
app.use("/juice", juiceRouter);
app.get("/", (req, res) => {
  console.log(process.env);

  try {
    res.send("Wellcome to api juice vape");
  } catch (error) {
    res.send("Error");
  }
});
// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  err => {
    console.log(err);
  }
);
//
app.listen(process.env.PORT || 5000);
