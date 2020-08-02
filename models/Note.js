const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  note: {
    type: String,
    require: true,
  },
  timestamp: {
    type: String,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Note", NoteSchema);
