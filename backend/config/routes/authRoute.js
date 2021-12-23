const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");

router.post("/login", controller.login);

module.exports = router;
