const app = require("express");
const router = app.Router();
const controller = require("../../controller/chat");

router.post("/room", controller.createRoom);

router.get("/room/:userId", controller.roomList);

router.get("/room/enter/:roomId", controller.enterRoom);

router.post("/room/join", controller.joinRoom);

router.get("/room/invites/received/:userId", controller.getReceivedInvites);

router.get("/room/invites/sent/:userId", controller.getSentInvites);

router.put("/room/invites", controller.rejectInvite);

router.delete("/room/invites", controller.deleteInvite);

router.delete("/room", controller.leaveRoom);

module.exports = router;
