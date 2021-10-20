const createRoom = require("./createRoom");
const enterRoom = require("./enterRoom");
const sendMessage = require("./sendMessage");
const roomList = require("./roomList");

exports.createRoom = function (req, res) {
  createRoom(req, res);
};

exports.roomList = function (req, res) {
  roomList(req, res);
};

exports.enter = function (req, res) {
  enterRoom(req, res);
};

exports.message = function (req, res) {
  sendMessage(req, res);
};
