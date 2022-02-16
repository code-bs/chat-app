const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  regDate: Date,
  users: [
    {
      userId: String,
      nickname: String,
      avatarUrl: String,
      statusMessage: String,
    },
  ],
  chatHistory: [
    {
      message: String,
      regDate: Date,
      userId: String,
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
