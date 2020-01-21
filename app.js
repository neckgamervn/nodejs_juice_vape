const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
// Middlewares
// app.use('/post',()=>{
//     console.log('log');
// })
app.use(bodyParser.json());
//routes
const postRouter = require("./routes/post");
app.use("/post", postRouter);
app.get("/", (req, res) => {
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
  () => {
    console.log("connect DB");
  }
);
//
app.listen(process.env.PORT || 5000);
