const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
require("dotenv/config");
const { exec } = require("child_process");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

app.post("/aws", async (req, res) => {
  var TimeStart = new Date().getTime();
  try {
    const Name = `sac_${new Date().getTime()}.jpg`;
    var base64Data = req.body.payload.replace(/^data:image\/png;base64,/, "");
    base64Data = base64Data.replace(/(\r\n|\n|\r)/gm, "");
    const sharp = require("sharp");
    var toUint8Array = require("base64-to-uint8array");
    var rekognition = new AWS.Rekognition({ region: "us-east-1" });
    // var bufferValue = Buffer.from(base64Data, "base64");
    var bufferValue = toUint8Array(base64Data);
    bufferValue = await sharp(bufferValue)
      .resize({ fit: "fill", width: 80, height: 80 })
      .toBuffer();
    rekognition.detectCustomLabels(
      {
        Image: {
          Bytes: bufferValue,
        },
        ProjectVersionArn:
          "arn:aws:rekognition:us-east-1:655053471542:project/cac_loai_sac/version/cac_loai_sac.2020-08-21T17.14.49/1598004889458",
        MinConfidence: 70,
      },
      (err, data) => {
        const timeLoad = new Date().getTime() - TimeStart;
        console.log(timeLoad);
        console.log(data);
        res.json(data);
      }
    );
    // require("fs").writeFile("images/" + Name, base64Data, "base64", function (
    //   err
    // ) {});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.listen(process.env.PORT || 5000);
