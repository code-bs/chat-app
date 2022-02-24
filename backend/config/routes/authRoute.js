const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");
const jwt = require("../../controller/common/jwt");

router.post("/login", controller.login);

router.post("/", controller.registUser);

router.get("/refresh_token", controller.refreshToken);

router.get("/logout", controller.logout);

router.put("/", jwt.validate, controller.updateProfile);

module.exports = router;
