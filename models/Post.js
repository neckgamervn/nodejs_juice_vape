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
  timestamp: {
    type: String,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("Post", PostSchema);
