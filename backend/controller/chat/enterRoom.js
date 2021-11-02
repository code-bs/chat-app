function getRoom() {
  return new Promise((resolve, reject) => {
    const roomId = this.req.params.roomId;
    this.logger.info(`[chatRouter][enterRoom]-> Enter to ${roomId}`);

    if (!roomId) {
      reject({
        statusCode: 400,
        controller: "enterRoom",
        message: "roomId undefined",
      });
    } else {
      this.model.getChatHistory(roomId, (err, result) => {
        if (err) reject(err);
        else {
          this.logger.info(`[chatRouter][enterRoom]-> getChatHistory OK`);
          this.room = result;
          resolve();
        }
      });
    }
  });
}

function sendResponse() {
  const response = {};

  response.message = `OK`;
  response.roomId = this.room._id;
  response.chatHistory = this.room.chatHistory;

  this.logger.info(`[chatRouter][enterRoom]-> Send Response`);

  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const errorHandler = require("../common/errorHandler");
  this.model = require("../../models/chatModels")({});
  this.logger = require("../../config/logger");

  this.req = req;
  this.res = res;

  try {
    await getRoom();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
