const e = require("express");
const express = require("express");
const router = express.Router();
const { onError, onSuccess, onSuccessArray } = require("../const");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  keyFilename: "./liquid-force-235517.json",
});
async function listFiles(prefix = "") {
  const bucketName = "liquid-force-235517.appspot.com";
  var [files] = await storage.bucket(bucketName).getFiles({ prefix });
  return files;
}

router.get("/", async (req, res) => {
  try {
    var files = await listFiles(req.query.prefix);
    files = files
      .filter((elem) => elem.metadata.contentType == "image/png")
      .map((file) => {
        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/`;
        const token = file.metadata.metadata.firebaseStorageDownloadTokens;
        return (
          baseUrl +
          "liquid-force-235517.appspot.com/o/" +
          file.name.split("/").join("%2F") +
          "?alt=media&token=" +
          token
        );
      });
    res.json(files);
  } catch (error) {
    console.log(error);
    res.json(onError());
  }
});

router.get("/prefix", async (req, res) => {
  try {
    var files = await listFiles();
    files = files
      .filter(
        (elem) =>
          elem.metadata.contentType ==
          "application/x-www-form-urlencoded;charset=UTF-8"
      )
      .map((elem) => elem.name);
    res.json(files);
  } catch (error) {
    console.log(error);
    res.json(onError());
  }
});

module.exports = router;
