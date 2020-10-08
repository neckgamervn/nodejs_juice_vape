const e = require("express");
const express = require("express");
const router = express.Router();
const { onError, onSuccess } = require("../const");
router.get("/", async (req, res) => {
  try {
    const { Storage } = require("@google-cloud/storage");
    const storage = new Storage({
      keyFilename: "./liquid-force-235517.json",
    });
    async function listFiles() {
      const bucketName = "liquid-force-235517.appspot.com";
      const [files] = await storage.bucket(bucketName).getFiles();
      console.log("Files:");
      return files
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
    }

    res.json(await listFiles());
  } catch (error) {
    console.log(error);
    res.json(onError("123"));
  }
});

module.exports = router;
