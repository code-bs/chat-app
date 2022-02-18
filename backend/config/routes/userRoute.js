const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.get("/", controller.searchUsers);

router.put("/", controller.updateProfile);

router.get("/request/got", controller.getReceivedReq);

router.get("/request/sent", controller.getSentReq);

router.put("/request", controller.rejectRequest);

router.delete("/request", controller.deleteRequest);

router.get("/friend", controller.friendList);

router.post("/friend", controller.addFriend);

router.delete("/friend", controller.deleteFriend);

module.exports = router;
