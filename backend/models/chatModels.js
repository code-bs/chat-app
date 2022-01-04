let Model = function () {
  const RoomSchema = require("./schemas/chatRoom");
  const _mysql = require("../config/initializer/mysqldb");

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
            status: 400,
            message: "방이 존재하지 않습니다.",
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
            status: 400,
            message: "방이 존재하지 않습니다.",
          },
          null
        );
      } else callback(err, null);
    }
  };

  this.mapRoomList = ({ userId, roomId }, callback) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_map_room (userId, roomId) VALUES(?, ?)",
        [userId, roomId],
        (err) => {
          if (err) callback(err);
          else {
            callback(null);
          }
        }
      );
      conn.release();
    });
  };

  this.getRoomInfos = async (userId, callback) => {
    try {
      const room = await RoomSchema.find({ masterUserId: userId }).exec();
      callback(null, room);
    } catch (error) {
      callback(error, null);
    }
  };

  this.getUsers = (roomId, callback) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickname, m.avatarUrl, m.statusMessage FROM tbl_map_room as r INNER JOIN tbl_member as m ON m.userId=r.userId WHERE roomId=?",
        [roomId],
        (err, result) => {
          if (err) callback(err, null);
          else {
            callback(null, result);
          }
        }
      );
      conn.release();
    });
  };
};

module.exports = function () {
  return new Model();
};
