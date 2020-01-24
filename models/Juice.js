const mongoose = require("mongoose");

const JuiceSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  des: {
    type: String,
    require: true
  },
  image: {
    type: Object,
    default: null
  },
  timestamp: {
    type: String,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("Juice", JuiceSchema);
