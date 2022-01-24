const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.get("/friend/:userId", controller.friendList);

router.post("/friend", controller.addFriend);

router.get("/:userId", controller.findUser);

router.get("/friend_req/:userId", controller.checkRequest);

router.put("/avatar", controller.changeAvatar);

router.put("/status_message", controller.changeStatusMessage);

module.exports = router;
