function createRoom() {
  return new Promise((resolve, reject) => {
    const { roomName, userId } = req.body;
    this.logger.info(
      `[chatRouter][createRoom]-> Start : ${roomName} ${userId}`
    );

    if (!roomName) {
      reject({
        statusCode: 400,
        controller: "createRoom",
        message: "roomName undefined",
      });
    } else if (!userId) {
      reject({
        statusCode: 400,
        controller: "createRoom",
        message: "userId undefined",
      });
    } else {
      this.model.createRoom(roomName, userId, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        this.logger.info(`[chatRouter][createRoom]-> DB insertion OK`);
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

  this.logger.info(`[chatRouter][createRoom]-> Send Response`);
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const errorHandler = require("../common/errorHandler");
  this.logger = require("../../config/logger");
  this.model = require("../../models/chatModels")({});
  this.req = req;
  this.res = res;

  try {
    await createRoom();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
