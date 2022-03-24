const addFriend = require("./addFriend");
const searchUsers = require("./searchUsers");
const friendList = require("./friendList");
const getReceivedReq = require("./getReceivedReq");
const getSentReq = require("./getSentReq");
const rejectRequest = require("./rejectRequest");
const deleteRequest = require("./deleteRequest");
const deleteFriend = require("./deleteFriend");
const getUserInfo = require("./getUserInfo");

module.exports = {
  addFriend,
  searchUsers,
  friendList,
  getReceivedReq,
  rejectRequest,
  deleteRequest,
  getSentReq,
  deleteFriend,
  getUserInfo,
};
