const UserController = require("../../controller/user/index");
const express = require("express");
const router = express.Router();

router.post("/", UserController.createUser);

module.exports = router;
