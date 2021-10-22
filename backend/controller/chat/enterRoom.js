function getRoom() {
  return new Promise((resolve, reject) => {
    const roomId = this.req.params.roomId;
    console.log(`[chatRouter][enterRoom]-> Enter to ${roomId}`);
    console.log(`[chatRouter][enterRoom]-> Searching...`);

    this.model.getChatHistory(roomId, (err, result) => {
      if (err) reject(err);
      else {
        this.room = result;
        resolve();
      }
    });
  });
}

function addNewUsertoChatRoom() {
  return new Promise((resolve, reject) => {
    console.log(`[chatRouter][enterRoom]-> Request Subscribe to mqtt`);

    resolve();
  });
}

function sendResponse() {
  const response = {};

  response.message = `OK`;
  response.roomId = this.room._id;
  response.chatHistory = this.room.chatHistory;

  console.log("[chatRouter][enterRoom]-> Send response");

  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  this.req = req;
  this.res = res;
  const chatRoomModel = require("../../models/chatModels");
  this.model = chatRoomModel({});

  try {
    await getRoom();
    await addNewUsertoChatRoom();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
