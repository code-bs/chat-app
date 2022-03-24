const chatModel = require("../../models/chatModels")();
const userModel = require("../../models/userModels")();
const logger = require("../logger");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { instrument } = require("@socket.io/admin-ui");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: ["http://localhost:8000", "https://admin.socket.io"],
  credentials: true,
});

instrument(io, {
  auth: false,
});

module.exports = function (socket_port) {
  return new Promise((resolve, reject) => {
    io.on("connection", (socket) => {
      socket.on("disconnect", (done) => {
        console.log(socket.id);
        userModel.deleteSocketInfo(socket.id, (err, result) => {
          if (err) done(err);
          else done(null);
        });
      });

      socket.on("login", (userId, done) => {
        socket["nickname"] = userId;
        userModel.newSocketInfo(userId, socket.id, (err, result) => {
          if (err) done("Internal Server Error");
        });
        chatModel.getRoomIds(userId, (err, results) => {
          if (err) done("Internal Server Error");
          results.forEach((result) => {
            socket.join(result.roomId);
          });
          done(null);
        });
      });

      socket.on("message", (info, done) => {
        const { roomId, userId, message } = info;
        chatModel.createNewChatHistory(info, (err) => {
          if (err) done("Internal Server Error");
        });
        socket.to(roomId).emit("newMessage", {
          roomId,
          message,
          userId,
        });
        done(null);
      });

      socket.on("enterRoom", (roomId, done) => {
        socket.join(roomId);
      });

      socket.on("leaveRoom", (roomId, done) => {
        socket.leave(roomId);
      });

      socket.on("friend", (info, done) => {
        const { sender, targetId } = info;
        userModel.checkInvite(sender.userId, targetId, (err, result) => {
          if (err) done("Internal Server Error");
          else if (result.length > 0) done("이미 보낸 요청입니다.");
          else {
            userModel.invite(sender.userId, targetId, (err) => {
              if (err) {
                done("Internal Server Error");
              }
            });
            userModel.getSocketId(targetId, (err, result) => {
              if (err) {
                done("Internal Server Error");
              } else {
                if (result.length !== 0) {
                  const { socketId } = result[0];
                  socket.to(socketId).emit("friendRequest", sender);
                }
                done(null);
              }
            });
          }
        });
      });

      socket.on("room", (info, done) => {
        const { sender, targetId, roomId } = info;
        chatModel.checkInvite(
          sender.userId,
          targetId,
          roomId,
          (err, result) => {
            if (err) done("Internal Server Error");
            else if (result.length > 0) done("이미 보낸 요청입니다.");
            else {
              chatModel.inviteRoom(sender.userId, targetId, roomId, (err) => {
                if (err) done("Internal Server Error");
              });
              userModel.getSocketId(targetId, (err, result) => {
                if (err) {
                  done("Internal Server Error");
                } else {
                  if (result.length !== 0) {
                    const { socketId } = result[0];
                    socket.to(socketId).emit("roomInvite", sender, roomId);
                  }
                  done(null);
                }
              });
            }
          }
        );
      });
    });

    io.listen(socket_port | 8888);
    resolve();
  });
};
