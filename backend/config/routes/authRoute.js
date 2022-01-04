const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");

router.post("/login", controller.login);

router.post("/", controller.registUser);

module.exports = router;
