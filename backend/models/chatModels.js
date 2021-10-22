const RoomSchema = require("./schemas/chatRoom");

// function generateRoomId(roomName, userId) {
//   /*
//    * 채팅방의 고유 번호 생성 규칙
//    *  - 규칙 설정 필요
//    */
//   return roomName + userId;
// }

let Model = function (config) {
  /* config variable init */
  let _mongo = null;

  /* set config variable */
  (() => {
    _mongo = config.mongo;
  })();

  /* models */
  this.createRoom = async (roomName, userId, callback) => {
    const payload = {
      roomName,
      masterUserId: userId,
      regDate: new Date(),
      chatHistory: [],
    };

    const newRoom = new RoomSchema(payload);

    try {
      const result = await newRoom.save();
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  };

  this.findAllChatRoom = async (callback) => {
    try {
      const roomList = await RoomSchema.find({});
      callback(null, roomList);
    } catch (err) {
      callback(err, null);
    }
  };

  this.getChatHistory = async (roomId, callback) => {
    try {
      const chatHistory = await RoomSchema.findById(
        roomId,
        "chatHistory"
      ).exec();

      callback(null, chatHistory);
    } catch (err) {
      callback(err, null);
    }
  };

  this.createNewChatHistory = async (roomId, message, userId, callback) => {
    const newMessage = {
      message,
      regDate: new Date(),
      userId,
    };
    try {
      const result = await RoomSchema.findOneAndUpdate(
        { _id: roomId },
        { $push: { chatHistory: newMessage } }
      );
      console.log(`[chatRouter][sendMessage]-> Update New History`);
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  };
};

module.exports = function (config) {
  return new Model(config);
};