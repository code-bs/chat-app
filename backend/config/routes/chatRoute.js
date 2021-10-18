const express = require("express");
const router = express.Router();
const ChatController = require("../../controller/chat/index");

router.get("/", (req, res) => {
  res.send("Chatting Page");
});

router.post("/room", ChatController.createRoom);

module.exports = router;
