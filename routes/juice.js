const express = require("express");
const router = express.Router();
const Juice = require("../models/Juice");
const { checkAuth, onError, onSuccess } = require("../const");

router.post("/", async (req, res) => {
  const createJuice = new Juice(req.body);
  try {
    const data = await createJuice.save();
    res.json(onSuccess(data));
  } catch (error) {
    res.json(onError());
  }
});

router.get("/", async (req, res) => {
  checkAuth(req, res, async () => {
    try {
      const getJuice = req.query._id
        ? await Juice.findById(req.query._id)
        : await Juice.find();
      res.json(onSuccess(getJuice));
    } catch (error) {
      res.json(onError());
    }
  });
});

router.delete("/", async (req, res) => {
  try {
    const remove = await Juice.findByIdAndRemove(req.body._id);
    res.json(onSuccess(remove));
  } catch (error) {
    res.json(onError());
  }
});
router.patch("/", async (req, res) => {
  try {
    const update = await Juice.findOneAndUpdate(req.body._id, {
      $set: {
        title: req.body.title
      }
    });
    res.json(onSuccess(update));
  } catch (error) {
    res.json(onError());
  }
});
module.exports = router;
