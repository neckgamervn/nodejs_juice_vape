const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const fileupload = require("express-fileupload");
require("dotenv/config");
app.use(bodyParser.json());
app.use(fileupload());
app.get("/", (req, res) => {
  res.json({
    msg: "aws demo",
  });
});

app.post("/aws", async (req, res) => {
  var TimeStart = new Date().getTime();
  try {
    const Name = `image_${new Date().getTime()}.jpg`;
    var bufferValue = req.files.payload.data;
    var rekognition = new AWS.Rekognition({ region: process.env.region });
    bufferValue = await require("sharp")(bufferValue)
      .resize({ fit: "fill", width: 100, height: 100 })
      .toBuffer();
    rekognition.detectCustomLabels(
      {
        Image: {
          Bytes: bufferValue,
        },
        ProjectVersionArn: process.env.AWS,
        MinConfidence: 70,
      },
      (err, data) => {
        const timeLoad = new Date().getTime() - TimeStart;
        console.log(timeLoad);
        res.json(data);
      }
    );
    require("fs").writeFile(
      "images/" + Name,
      req.files.payload.data,
      (err) => {}
    );
  } catch (error) {
    res.json({
      msg: "" + error,
    });
  }
});
app.listen(process.env.PORT || 5000);
