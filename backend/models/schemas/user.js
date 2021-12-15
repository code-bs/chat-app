const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  roomList: [
    {
      _id: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
