const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.post("/", controller.registUser);

router.get("/friend/:userSeqno", controller.friendList);

router.post("/friend", controller.addFriend);

router.get("/:userId", controller.findUser);

module.exports = router;
