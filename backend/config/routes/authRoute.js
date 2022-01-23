const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");

router.post("/login", controller.login);

router.post("/", controller.registUser);

router.get("/refresh_token", controller.refreshToken);

router.get("/logout", controller.logout);

module.exports = router;
