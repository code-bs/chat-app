const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  regDate: Date,
  masterUserId: String,
  chatHistory: [
    {
      message: String,
      regDate: Date,
      userId: String,
      nickname: String,
      avatarUrl: String,
      statusMessage: String,
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
