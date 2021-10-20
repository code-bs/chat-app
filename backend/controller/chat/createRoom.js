/*
 * createRoom
 * Method: POST
 *
 * request params:
 *  - roomName
 *  - userId
 *
 * Methods:
 * 1. 모델 생성 및 등록
 *
 * 2. 응답
 */

function createRoom() {
  return new Promise((resolve, reject) => {
    const { roomName, userId } = req.body;
    console.log("[chatRouter][createRoom]-> Start :", roomName, userId);

    if (!roomName) {
      reject({ statusCode: 400, message: "roomName undefined" });
    } else if (!userId) {
      reject({ statusCode: 400, message: "userId undefined" });
    } else {
      this.model.createRoom(roomName, userId, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(`[chatRouter][createRoom]-> ROOM NAME: ${result}`);

        this.room = result;
        resolve();
      });
    }
  });
}

function sendResponse() {
  this.res.status(200);
  const response = {};
  response.message = "Chat Room created successfully";
  response.room = this.room;

  console.log("[chatRouter][createRoom]-> Send Response");
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const chatRoomModel = require("../../models/chatModels"),
    mongoose = require("mongoose"),
    errorHandler = require("../common/errorHandler");

  this.model = chatRoomModel({
    mongo: mongoose,
  });
  this.req = req;
  this.res = res;

  try {
    await createRoom();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
