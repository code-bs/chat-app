const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  socketId: String,
  userId: String,
});

module.exports = mongoose.model("User", userSchema);
