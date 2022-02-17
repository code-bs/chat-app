const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.get("/friend/:userId", controller.friendList);

router.post("/friend", controller.addFriend);

router.get("/:userId", controller.getUser);

router.get("/", controller.searchUser);

router.get("/friend_req/received/:userId", controller.getReceivedReq);

router.get("/friend_req/sent/:userId", controller.getSentReq);

router.put("/", controller.updateProfile);

router.put("/friend_req", controller.rejectRequest);

router.delete("/friend_req", controller.deleteRequest);

module.exports = router;
