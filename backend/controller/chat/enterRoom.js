const runner = require("../common/runner");

function getRoom(done) {
  const roomId = this.req.params.roomId;
  this.logger.info(`[chatRouter][enterRoom]-> Enter to ${roomId}`);
  if (!roomId) {
    console.error("방을 지정하지 않았습니다.");
  } else {
    this.model.getChatHistory(roomId, (err, result) => {
      if (err) console.error(err);
      else {
        this.logger.info(`[chatRouter][enterRoom]-> getChatHistory OK`);
        this.room = result;
        done();
      }
    });
  }
}

function sendResponse() {
  const response = {};
  response.message = `OK`;
  response.roomId = this.room._id;
  response.chatHistory = this.room.chatHistory;
  this.logger.info(`[chatRouter][enterRoom]-> Send Response`);
  this.res.jsonp(response);
}

function Controller(config, req, res, next) {
  this.res = res;
  this.req = req;
  this.config = config;
  this.logger = require("../../config/logger");
  this.model = config.model;

  runner([getRoom, sendResponse], this, next);
}

module.exports = Controller;
