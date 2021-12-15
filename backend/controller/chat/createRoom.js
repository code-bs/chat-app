const runner = require("../common/runner");

function createRoom(done) {
  const { roomName, userId } = this.req.body;
  this.logger.info(`[chatRouter][createRoom]-> Start : ${roomName} ${userId}`);
  if (!roomName) {
    console.error("방 이름이 필요합니다.");
  } else if (!userId) {
    console.error("유저 아이디가 필요합니다.");
  } else {
    this.model.createRoom(roomName, userId, (err, result) => {
      if (err) {
        console.error(err);
      }
      this.logger.info(`[chatRouter][createRoom]-> DB insertion OK`);
      this.room = result;
      done();
    });
  }
}

function sendResponse() {
  this.res.status(200);
  const response = {};
  response.message = "Chat Room created successfully";
  response._id = this.room._id.toString();
  this.logger.info(`[chatRouter][createRoom]-> Send Response`);
  this.res.jsonp(response);
}

function Controller(config, req, res, next) {
  this.res = res;
  this.req = req;
  this.config = config;
  this.logger = require("../../config/logger");
  this.model = config.model;

  runner([createRoom, sendResponse], this, next);
}

module.exports = Controller;
