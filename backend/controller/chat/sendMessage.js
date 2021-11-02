function saveHistory() {
  return new Promise((resolve, reject) => {
    this.logger.info(
      `[chatRouter][sendMessage]-> saveHistory: ${req.body.message}`
    );
    // const message = req.body.message,
    //   userId = req.body.userId,
    //   roomId = req.body.roomId;
    const { message, userId, roomId } = req.body;

    this.roomId = roomId;
    this.userId = userId;
    this.message = message;

    if (!message)
      reject({
        statusCode: 400,
        controller: "sendMessage",
        message: "Message undefined",
      });
    else if (!userId)
      reject({
        statusCode: 400,
        controller: "sendMessage",
        message: "User undefined",
      });
    else if (!roomId)
      reject({
        statusCode: 400,
        controller: "sendMessage",
        message: "Room undefined",
      });
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

function sendResponse() {
  const response = {};
  response.message = `You sent ${this.message}`;

  this.logger.info("[chatRouter][sendMessage]-> Send response");
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const errorHandler = require("../common/errorHandler");
  this.model = require("../../models/chatModels")({});
  this.logger = require("../../config/logger");

  this.req = req;
  this.res = res;

  try {
    await saveHistory();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
