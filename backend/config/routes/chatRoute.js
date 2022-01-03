const app = require("express");
const router = app.Router();
const controller = require("../../controller/chat");

router.post("/room", controller.createRoom);

router.get("/room", controller.roomList);

router.get("/room/enter/:roomId", controller.enterRoom);

module.exports = router;
