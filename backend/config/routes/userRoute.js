const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.get("/friend/:userId", controller.friendList);

router.post("/friend", controller.addFriend);

router.get("/:userId", controller.findUser);

module.exports = router;
