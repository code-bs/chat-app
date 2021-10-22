/**
 * sendMessage
 * Method: POST
 *
 * request params:
 *  - message
 *  - regDate
 *  - sentUserId
 *
 * @Methods:
 * 1.
 *
 * 2.
 *
 * response payload:
 *  -
 */
function saveHistory() {
  return new Promise((resolve, reject) => {
    console.log(`[chatRouter][sendMessage]-> saveHistory: ${req.body.message}`);
    const message = req.body.message,
      userId = req.body.userId,
      roomId = req.body.roomId;

    this.roomId = roomId;
    this.userId = userId;
    this.message = message;

    if (!message) reject();
    else if (!userId) reject();
    else {
      this.model.createNewChatHistory(roomId, message, userId, (err) => {
        if (err) reject(err);
        else {
          resolve();
        }
      });
    }
  });
}

function publish() {
  return new Promise((resolve, reject) => {
    console.log(`[chatRouter][sendMessage]-> Publish to MQTT`);
    this.mqttSender(this.roomId, this.message);
    resolve();
  });
}

function sendResponse() {
  const response = {};
  response.message = `You sent ${this.message}`;

  console.log("[chatRouter][sendMessage]-> Send response");
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const chatRoomModel = require("../../models/chatModels"),
    mongoose = require("mongoose");

  this.model = chatRoomModel({
    mongo: mongoose,
  });

  this.mqttSender = require("../common/functions/mqttSender");
  this.req = req;
  this.res = res;

  try {
    await saveHistory();
    await publish();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
