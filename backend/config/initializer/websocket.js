const chatModel = require("../../models/chatModels")({});
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

module.exports = function () {
  io.on("connection", (socket) => {
    // socket.on("enterRoom", (info) => {
    //   const { roomId } = info;
    //   console.log("ENTERING ROOM", roomId);
    //   socket.join(roomId);
    // });

    // socket.on("sendMessage", (payload) => {
    //   const { roomId, message } = payload;
    //   console.log("SENDING MESSAGE", roomId, message);
    //   socket.to(roomId).emit(message);
    // });

    socket.on("sendMessage", (info) => {
      const { roomId, nickName, message } = info;
      chatModel.createNewChatHistory(
        roomId,
        message,
        nickName,
        (err, result) => {
          if (err) console.error(err);
          else {
            console.log("SET NEW CHAT LOG:", result);
          }
        }
      );
      io.emit(roomId, message);
    });
  });

  io.listen(process.env.SOCKET_PORT | 8888);
};
