const chatModel = require("../../models/chatModels")({});
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
    });

    io.listen(process.env.SOCKET_PORT | 8888);
    resolve();
  });
};
