const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");
const { exec } = require("child_process");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

app.post("/aws", async (req, res) => {
  try {
    const Name = `sac_${new Date().getTime()}.jpg`;
    var base64Data = req.body.payload.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("images/" + Name, base64Data, "base64", function (
      err
    ) {
      exec(
        "cd images && ls && aws s3 sync . s3://store-wind",
        (err, out, outErr) => {
          const Bucket = "store-wind";
          const url = `https://${Bucket}.s3.amazonaws.com/${Name}`;
          exec(
            `aws rekognition detect-custom-labels \
          --project-version-arn "arn:aws:rekognition:us-east-1:655053471542:project/cac_loai_sac/version/cac_loai_sac.2020-08-21T17.14.49/1598004889458" \
          --image '{"S3Object": {"Bucket": "${Bucket}","Name": "${Name}"}}' \
          --region us-east-1`,
            (err, out, outErr) => {
              res.json({ url, ...JSON.parse(out) });
            }
          );
        }
      );
    });
  } catch (error) {
    res.send(error);
  }
});
app.listen(process.env.PORT || 5000);
