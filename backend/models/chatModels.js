const RoomSchema = require("./schemas/chatRoom");
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
      if (err.path && err.path === "_id") {
        callback(
          {
            statusCode: 400,
            controller: "enterRoom",
            message: "Not valid roomId",
          },
          null
        );
      } else callback(err, null);
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
      callback(null, result);
    } catch (err) {
      if (err.path && err.path === "_id") {
        callback(
          {
            statusCode: 400,
            controller: "sendMessage",
            message: "Not valid roomId",
          },
          null
        );
      } else callback(err, null);
    }
  };
};

module.exports = function (config) {
  return new Model(config);
};
