const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
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
// const juiceRouter = require("./routes/juice");
const userRouter = require("./routes/user");
// const noteRouter = require("./routes/note");
const categorizeRouter = require("./routes/categorize");
// app.use("/juice", juiceRouter);
app.use("/user", userRouter);
app.use("/categorize", categorizeRouter);
// app.use("/CRUD", noteRouter);
app.get("/", (req, res) => {
  try {
    res.send("Wellcome to MP_DEMO");
  } catch (error) {
    res.send("Error");
  }
});

setInterval(() => {
  fetch("https://noce-juice-vape.herokuapp.com/").then((res) => {
    res.text().then((res) => {
      console.log(res);
    });
  });
}, 1500000);

app.listen(process.env.PORT || 5000);
