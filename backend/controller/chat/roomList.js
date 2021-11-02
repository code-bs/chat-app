function getRooms() {
  return new Promise((resolve, reject) => {
    this.logger.info(`[chatRouter][roomList]-> Getting Room List...`);

    this.model.findAllChatRoom((err, result) => {
      if (err) reject(err);
      else {
        this.logger.info(`[chatRouter][roomList]-> Got Room List`);
        this.rooms = result;
        resolve();
      }
    });
  });
}

function sendResponse() {
  const response = {};

  response.rooms = this.rooms;

  this.logger.info(`[chatRouter][roomList]-> Send response`);
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  const errorHandler = require("../common/errorHandler");
  this.req = req;
  this.res = res;
  this.model = require("../../models/chatModels")({});
  this.logger = require("../../config/logger");

  try {
    await getRooms();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
