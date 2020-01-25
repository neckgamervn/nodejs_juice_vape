const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CONST = require("../const");
const sha256 = require("sha256");
router.post("/Login", async (req, res) => {
  const createUser = new User(req.body);
  try {
    const data = await createUser.save();
    res.json(CONST.onSuccess(data));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
router.post("/Logout", async (req, res) => {
  const createUser = new User(req.body);
  try {
    const data = await createUser.save();
    res.json(CONST.onSuccess(data));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
router.post("/Register", async (req, res) => {
  try {
    const check = await User.find({ username: req.body.username });
    const token = sha256(req.body.username + Date.now() + req.body.password);
    if (check.length == 0)
      new User({
        username: req.body.username,
        token: token
      })
        .save()
        .then(() => res.json(CONST.onSuccess(token)));
    else {
      res.json(CONST.onSuccess("đã tồn tại"));
    }
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.get("/UserInfo", async (req, res) => {
  try {
    const getUser = req.query._id
      ? await User.findById(req.query._id)
      : await User.find();
    res.json(CONST.onSuccess(getUser));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.patch("/UpdateUserInfo", async (req, res) => {
  try {
    const update = await User.findOneAndUpdate(req.body._id, {
      $set: {
        title: req.body.title
      }
    });
    res.json(CONST.onSuccess(update));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
module.exports = router;
