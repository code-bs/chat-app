const app = require("express");
const router = app.Router();
const controller = require("../../controller/auth");

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: 로그인
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: 로그인 아이디
 *              password:
 *                type: string
 *                description: 패스워드
 */
router.post("/login", controller.login);

module.exports = router;
