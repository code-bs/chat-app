const express = require("express");
const router = express.Router();
const ChatController = require("../../controller/chat/index");

router.get("/", ChatController.createRoom);

module.exports = router;
