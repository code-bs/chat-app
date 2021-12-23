const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.post("/", controller.registUser);

router.post("/friend", controller.addFriend);

module.exports = router;
