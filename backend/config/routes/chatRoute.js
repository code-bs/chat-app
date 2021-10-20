const express = require("express");
const router = express.Router();
const ChatController = require("../../controller/chat/index");

router.get("/", (req, res) => {
  res.send("Chatting Page");
});

/* 방 생성 */
router.post("/room", ChatController.createRoom);

/* 모든 방 목록 조회 */
router.get("/room", ChatController.roomList);

router.get("/room/enter/:roomId", ChatController.enter);

router.post("/message", ChatController.message);

module.exports = router;
