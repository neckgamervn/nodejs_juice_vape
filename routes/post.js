const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const postS = new Post({
    title: req.body.title,
    des: req.body.des
  });
  try {
    const data = await postS.save();
    res.json(data);
  } catch (error) {
    res.json({
      mess: "err"
    });
  }
});
module.exports = router;
