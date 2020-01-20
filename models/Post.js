const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  des: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Posts", PostSchema);
