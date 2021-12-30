const app = require("express");
const router = app.Router();
const controller = require("../../controller/user/index");

/**
 * @swagger
 * /user:
 *  post:
 *    summary: 회원가입
 *    tags: [User]
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
router.post("/", controller.registUser);

/**
 * @swagger
 * /friend/{userSeqno}:
 *  get:
 *   summary: 사용자의 친구 목록
 *   tags: [User]
 *   parameters:
 *     - in: path
 *       name: userSeqno
 *       schema:
 *         type: int
 *       required: true
 *       description: 유저 고유 번호
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *           userSeqno:
 *             type: int
 *             description: 각 친구의 userSeqno
 *           userId:
 *             type: string
 *             description: 각 친구의 id
 *           nickname:
 *             type: string
 *             description: 각 친구의 닉네임
 */
router.get("/friend/:userSeqno", controller.friendList);

/**
 * @swagger
 * /friend:
 *  post:
 *    summary: 친구 등록
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userSeqno:
 *                type: int
 *                description: 현 사용자의 userSeqno
 *              friendId:
 *                type: string
 *                description: 등록하려는 친구의 id
 */
router.post("/friend", controller.addFriend);

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *   summary: 모든 방 목록을 반환
 *   tags: [Chat]
 *   responses:
 *    "200":
 *     description: OK
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Room'
 */
router.get("/:userId", controller.findUser);

module.exports = router;
