const mongoose = require("mongoose");

const Categorize = mongoose.Schema({
  cate: {
    type: String,
    require: true,
  },
  questions: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Categorize", Categorize);
