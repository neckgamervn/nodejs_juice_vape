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
  err => {
    if (err) console.log(err);
    else console.log("connect to mongoDB success");
  }
);
//routes
const juiceRouter = require("./routes/juice");
const userRouter = require("./routes/user");
app.use("/juice", juiceRouter);
app.use("/", userRouter);
app.get("/", (req, res) => {
  try {
    res.send("Wellcome to api juice vape");
  } catch (error) {
    res.send("Error");
  }
});

// setInterval(async () => {
//   const fetch = require("node-fetch");
//   const URL = "http://www.tlu.edu.vn/";
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));  fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   fetch(URL)
//     // .then(res => res.json())
//     .then(json => console.log(json));
// }, 1);

app.listen(process.env.PORT || 5000);
