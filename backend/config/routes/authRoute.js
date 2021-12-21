const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");

router.get("/", (req, res) => {
  res.send("auth Router!");
});

router.post("/login", controller.login);

module.exports = router;
