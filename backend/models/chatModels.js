let Model = function () {
  const RoomSchema = require("./schemas/chatRoom");
  const _mysql = require("../config/initializer/mysqldb");

  this.createRoom = async (roomName, user, callback) => {
    const users = [];
    users.push(user);
    const payload = {
      roomName,
      users,
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

  this.createNewChatHistory = async (payload, callback) => {
    const { roomId, userId, message } = payload;
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
      callback(err, null);
    }
  };

  this.newUser = async (roomId, user, callback) => {
    try {
      await RoomSchema.findOneAndUpdate(
        { _id: roomId },
        { $push: { users: user } }
      );
      callback(null);
    } catch (err) {
      callback(err);
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

  this.getRoomIds = (userId, callback) => {
    _mysql((conn) => {
      conn.query(
        "SELECT roomId from tbl_map_room WHERE userId=?",
        [userId],
        (err, result) => {
          if (err) callback(err, null);
          else callback(null, result);
        }
      );
      conn.release();
    });
  };

  this.getRoomInfo = async (roomId, callback) => {
    try {
      const info = await RoomSchema.findById(roomId).exec();
      callback(null, info);
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

  this.inviteRoom = (userId, targetId, roomId, callback) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_invite_room (userId, targetId, roomId) VALUES(?, ?, ?)",
        [userId, targetId, roomId],
        (err) => {
          if (err) callback(err);
          else callback(null);
        }
      );
      conn.release();
    });
  };

  this.checkInvite = (userId, roomId, callback) => {
    _mysql((conn) => {
      conn.query(
        "SELECT _id FROM tbl_invite_room WHERE targetId=? AND roomId=?",
        [userId, roomId],
        (err, result) => {
          if (err) callback(err, null);
          else callback(null, result);
        }
      );
      conn.release();
    });
  };

  this.getRoomInvites = (targetId, callback) => {
    _mysql((conn) => {
      conn.query(
        "SELECT r.targetId, r.userId, m.nickname, m.avatarUrl, m.statusMessage, r.roomId FROM tbl_invite_room as r INNER JOIN tbl_member as m ON m.userId=r.userId WHERE r.targetId=?",
        [targetId],
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

  this.deleteInvite = (userId, roomId, callback) => {
    _mysql((conn) => {
      conn.query(
        "DELETE FROM tbl_invite_room WHERE targetId=? AND roomId=?",
        [userId, roomId],
        (err) => {
          if (err) callback(err);
          else callback(null);
        }
      );
      conn.release();
    });
  };

  /* leaveRoom */
  this.checkUserInRoom = (userId, roomId, callback) => {
    _mysql((conn) => {
      conn.query(
        "SELECT _id FROM tbl_map_room WHERE userId=? AND roomId=?",
        [userId, roomId],
        (err, result) => {
          if (err) callback(err, null);
          else callback(null, result);
        }
      );
      conn.release();
    });
  };

  this.delUserInMongo = async (roomId, userId, callback) => {
    try {
      await RoomSchema.findOneAndUpdate(
        { _id: roomId },
        { $pull: { users: { userId: userId } } }
      );
      callback(null);
    } catch (error) {
      callback(error);
    }
  };

  this.delUserInMysql = (roomId, userId, callback) => {
    _mysql((conn) => {
      conn.query(
        "DELETE FROM tbl_map_room WHERE userId=? AND roomId=?",
        [userId, roomId],
        (err) => {
          if (err) callback(err);
          else callback(null);
        }
      );
      conn.release();
    });
  };
};

module.exports = function () {
  return new Model();
};
