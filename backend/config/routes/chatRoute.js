const express = require("express");
const router = express.Router();
const ChatController = require("../../controller/chat/index");

/**
 * @swagger
 * components:
 *  schemas:
 *    Room:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: 자동 생성된 방 고유 번호
 *        roomName:
 *          type: string
 *          description: 사용자가 지정한 방 이름
 *        regDate:
 *          type: string
 *          description: 생성된 날짜
 *        masterUserId:
 *          type: string
 *          description: 방을 생성한 유저 고유 번호
 *        chatHistory:
 *          type: array
 *          description: 채팅 기록
 */
router.get("/", (req, res) => {
  res.send("Chatting Page");
});

/**
 * @swagger
 * /chat/room:
 *  post:
 *    summary: 새로운 방 생성
 *    tags: [Chat]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              roomName:
 *                type: string
 *                description: 사용자가 입력한 방 이름
 *              userId:
 *                type: string
 *                description: 요청한 유저의 고유 번호
 */
router.post("/room", ChatController.createRoom);

/**
 * @swagger
 * /chat/room:
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
router.get("/room", ChatController.roomList);

/**
 * @swagger
 * /chat/room/enter/{roomId}:
 *  get:
 *    summary: 방 고유 번호가 roomId 인 방에 입장
 *    tags: [Chat]
 *    parameters:
 *      - in: path
 *        name: roomId
 *        schema:
 *          type: string
 *        required: true
 *        description: 방 고유 번호
 *    responses:
 *      200:
 *        description: 입장한 방 id와 채팅 기록 배열
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: OK 고정
 *                _id:
 *                  type: string
 *                  description: 방 고유 번호
 *                chatHistory:
 *                  type: array
 *                  description: 채팅 기록
 */
router.get("/room/enter/:roomId", ChatController.enter);

/**
 * @swagger
 * /chat/message:
 *  post:
 *    summary: 채팅 메시지 전송
 *    tags: [Chat]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: 메시지를 보낸 유저 고유 번호
 *              message:
 *                type: string
 *                description: 메시지 내용
 *              roomId:
 *                type: string
 *                description: 방 고유 번호
 */
router.post("/message", ChatController.message);

module.exports = router;
