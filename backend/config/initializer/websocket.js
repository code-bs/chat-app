const chatModel = require("../../models/chatModels")({});
const userModel = require("../../models/userModels")();
const logger = require("../logger");
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

module.exports = function () {
  return new Promise((resolve, reject) => {
    io.on("connection", (socket) => {
      socket.on("whisper", (info) => {
        const { targetId, message } = info;
        io.emit(targetId, message);
      });

      socket.on("sendMessage", (info) => {
        const { roomId, nickname, message } = info;
        chatModel.createNewChatHistory(roomId, message, nickname, (err) => {
          if (err) reject(err);
        });
        io.emit(roomId, message);
      });

      socket.on("friend", (info) => {
        const { userId, targetId } = info;
        logger.info(
          `[socket][friend]-> ${userId} wants to be friend, ${targetId}`
        );
        const message = { type: "friend", userId };
        userModel.invite(userId, targetId, (err) => {
          if (err)
            io.emit(userId, {
              type: "friend_invite_error",
              message: "DB ERROR",
            });
          else io.emit(targetId, message);
        });
      });

      socket.on("invite", (info) => {
        const { userId, targetId, roomId } = info;
        logger.info(
          `[socket][room]-> ${userId} invites ${targetId} to ${roomId}`
        );
        const message = { type: "room", userId, roomId };
        chatModel.inviteRoom(targetId, roomId, (err) => {
          if (err)
            io.emit(userId, { type: "room_invite_error", message: "DB ERROR" });
          else io.emit(targetId, message);
        });
      });
    });

    io.listen(process.env.SOCKET_PORT | 8888);
    resolve();
  });
};
