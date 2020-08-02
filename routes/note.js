const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { onError, onSuccess, onSuccessArray } = require("../const");

router.post("/CreateNote", async (req, res) => {
  const createNote = new Note(req.body);
  try {
    const data = await createNote.save();
    res.json(onSuccess(data));
  } catch (error) {
    res.json(onError());
  }
});

router.get("/GetNotes", async (req, res) => {
  try {
    const getNotes = req.query._id
      ? await Note.findById(req.query._id)
      : await Note.find();
    res.json(onSuccessArray(getNotes));
  } catch (error) {
    res.json(onError());
  }
});

router.post("/DeleteNote", async (req, res) => {
  try {
    const remove = await Note.findByIdAndRemove(req.body.id);
    res.json(onSuccess(remove));
  } catch (error) {
    res.json(onError());
  }
});
router.post("/UpdateNote", async (req, res) => {
  try {
    const { note } = req.body;
    const update = await Note.findOneAndUpdate(req.body.id, {
      $set: {
        note,
      },
    });
    const { timestamp, _id } = update;
    res.json(
      onSuccess({
        note,
        timestamp,
        _id,
      })
    );
  } catch (error) {
    res.json(onError());
  }
});
module.exports = router;
