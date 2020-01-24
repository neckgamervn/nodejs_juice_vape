const express = require("express");
const router = express.Router();
const Juice = require("../models/Juice");
const CONST = require("../const");
router.post("/", async (req, res) => {
  const createJuice = new Juice(req.body);
  try {
    const data = await createJuice.save();
    res.json(CONST.onSuccess(data));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.get("/", async (req, res) => {
  try {
    const getJuice = req.query._id
      ? await Juice.findById(req.query._id)
      : await Juice.find();
    res.json(getJuice ? CONST.onSuccess(getJuice) : CONST.EMPTY);
  } catch (error) {
    res.json(CONST.ERROR);
  }
});

router.delete("/", async (req, res) => {
  try {
    const remove = await Juice.findByIdAndRemove(req.body._id);
    res.json(CONST.onSuccess(remove));
  } catch (error) {
    res.json(CONST.ERROR);
  }
});
router.patch("/", async (req, res) => {
  try {
    const update = await Juice.findOneAndUpdate(req.body._id, {
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
