const app = require("express");
const router = app.Router();
const controller = require("../../controller/chat");

router.post("/room", controller.createRoom);

router.get("/room/:userId", controller.roomList);

router.get("/room/enter/:roomId", controller.enterRoom);

router.post("/room/join", controller.joinRoom);

router.get("/room/invites/:userId", controller.getInvites);

module.exports = router;
