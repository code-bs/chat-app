const addFriend = require("./addFriend");
const searchUsers = require("./searchUsers");
const friendList = require("./friendList");
const getReceivedReq = require("./getReceivedReq");
const getSentReq = require("./getSentReq");
const updateProfile = require("./updateProfile");
const rejectRequest = require("./rejectRequest");
const deleteRequest = require("./deleteRequest");
const deleteFriend = require("./deleteFriend");

module.exports = {
  addFriend,
  searchUsers,
  friendList,
  getReceivedReq,
  updateProfile,
  rejectRequest,
  deleteRequest,
  getSentReq,
  deleteFriend,
};
