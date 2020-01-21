const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const CONST = require("../const");
router.post("/", async (req, res) => {
  const createPost = new Post(req.body);
  try {
    const data = await createPost.save();
    res.json(CONST.onSuccess(data));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.get("/", async (req, res) => {
  try {
    const getPost = req.query._id
      ? await Post.findById(req.query._id)
      : await Post.find();
    res.json({
      data: getPost
    });
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.delete("/", async (req, res) => {
  try {
    const remove = await Post.findByIdAndRemove(req.body._id);
    res.json(CONST.SUCCESS);
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
router.patch("/", async (req, res) => {
  try {
    const update = await Post.findByIdAndUpdate(req.body._id, {
      $set: {
        title: "ahihi"
      }
    });
    res.json(CONST.SUCCESS);
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
module.exports = router;
