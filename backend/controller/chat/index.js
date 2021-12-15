const createRoom = require("./createRoom");
const enterRoom = require("./enterRoom");
const sendMessage = require("./sendMessage");
const roomList = require("./roomList");

function ChatController(model) {
  if (!(this instanceof ChatController)) {
    return new ChatController(model);
  }
  this.model = model;
}

ChatController.prototype.createRoom = function () {
  var self = this;
  return (req, res, next) => {
    new createRoom(self, req, res, next);
  };
};

ChatController.prototype.roomList = function () {
  var self = this;
  return (req, res, next) => {
    new roomList(self, req, res, next);
  };
};

ChatController.prototype.sendMessage = function (req, res) {
  var self = this;
  return (req, res, next) => {
    new sendMessage(self, req, res, next);
  };
};

ChatController.prototype.enterRoom = function () {
  var self = this;
  return (req, res, next) => {
    new enterRoom(self, req, res, next);
  };
};

module.exports = ChatController;
