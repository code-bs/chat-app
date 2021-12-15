const runner = require("../common/runner");

function getRooms(done) {
  this.logger.info(`[chatRouter][roomList]-> Getting Room List...`);
  this.model.findAllChatRoom((err, result) => {
    if (err) reject(err);
    else {
      this.logger.info(`[chatRouter][roomList]-> Got Room List`);
      this.rooms = result;
      done();
    }
  });
}

function sendResponse() {
  const response = {};
  response.rooms = this.rooms;
  this.logger.info(`[chatRouter][roomList]-> Send response`);
  this.res.jsonp(response);
}

function Controller(config, req, res, next) {
  this.res = res;
  this.req = req;
  this.config = config;
  this.logger = require("../../config/logger");
  this.model = config.model;

  console.log("MODEL", this.model);
  runner([getRooms, sendResponse], this, next);
}

module.exports = Controller;
