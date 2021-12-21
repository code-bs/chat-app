const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

router.post("/", controller.registUser);

module.exports = router;
