const app = require("express");
const router = app.Router();
const controller = require("../../controller/chat");

router.post("/room", controller.createRoom);

router.get("/room", controller.roomList);

router.delete("/room", controller.leaveRoom);

router.get("/invitation/got", controller.getReceivedInvites);

router.get("/invitation/sent", controller.getSentInvites);

router.post("/invitation", controller.joinRoom);

router.put("/invitation", controller.rejectInvite);

router.delete("/invitation", controller.deleteInvite);

module.exports = router;
