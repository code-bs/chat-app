const runner = require("../common/runner");

function saveHistory(done) {
  this.logger.info(
    `[chatRouter][sendMessage]-> saveHistory: ${this.req.body.message}`
  );
  const { message, userId, roomId } = this.req.body;

  this.roomId = roomId;
  this.userId = userId;
  this.message = message;

  if (!message) console.error("Message Undefined");
  else if (!userId) console.error("userId Undefined");
  else if (!roomId) console.error("roomId Undefined");
  else {
    this.model.createNewChatHistory(roomId, message, userId, (err) => {
      if (err) console.error(err);
      else {
        done();
      }
    });
  }
}

function sendResponse() {
  const response = {};
  response.message = `You sent ${this.message}`;
  this.logger.info("[chatRouter][sendMessage]-> Send response");
  this.res.jsonp(response);
}

function Controller(config, req, res, next) {
  this.res = res;
  this.req = req;
  this.logger = require("../../config/logger");
  this.model = config.model;

  runner([saveHistory, sendResponse], this, next);
}

module.exports = Controller;
