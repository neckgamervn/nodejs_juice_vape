const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

const { exec } = require("child_process");

app.use(bodyParser.json());
// connect to DB
// mongoose.connect(
//   process.env.DB_CONNECTION,
//   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
//   (err) => {
//     if (err) console.log(err);
//     else console.log("connect to mongoDB success");
//   }
// );
//routes
const juiceRouter = require("./routes/juice");
const userRouter = require("./routes/user");
const noteRouter = require("./routes/note");
// app.use("/juice", juiceRouter);
// app.use("/", userRouter);
// app.use("/CRUD", noteRouter);
app.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

app.get("/aws", (req, res) => {
  const { Bucket, Name } = req.query;
  const url = `https://${Bucket}.s3.amazonaws.com/${Name}`;
  try {
    exec(
      ` aws rekognition detect-custom-labels \
    --project-version-arn "arn:aws:rekognition:us-east-1:655053471542:project/custom-lables/version/custom-lables.2020-08-20T17.01.00/1597917661204" \
    --image '{"S3Object": {"Bucket":"${Bucket}","Name": "${Name}"}}' \
    --region us-east-1`,
      (err, out, outErr) => {
        res.json({ url, ...JSON.parse(out) });
      }
    );
  } catch (error) {
    res.send(error);
  }
});
app.listen(process.env.PORT || 5000);
