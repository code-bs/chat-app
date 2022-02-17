const addFriend = require("./addFriend");
const searchUser = require("./searchUser");
const getUser = require("./getUser");
const friendList = require("./friendList");
const getReceivedReq = require("./getReceivedReq");
const getSentReq = require("./getSentReq");
const updateProfile = require("./updateProfile");
const rejectRequest = require("./rejectRequest");
const deleteRequest = require("./deleteRequest");

module.exports = {
  addFriend,
  searchUser,
  getUser,
  friendList,
  getReceivedReq,
  updateProfile,
  rejectRequest,
  deleteRequest,
  getSentReq,
};
