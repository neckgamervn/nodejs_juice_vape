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
app.get('/',(req,res)=>{
  res.send("Wellcome")
})
// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("connect DB");
  }
);
//
app.listen(80);
