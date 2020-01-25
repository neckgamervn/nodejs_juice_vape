const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  token: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  timestamp: {
    type: String,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("User", UserSchema);
