const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.SOCKET_PORT || 8888;
const logger = require("../logger");
const mongoModel = require("../../models/chatModels")({});

const websocketServerInit = () => {
  return new Promise((resolve, reject) => {
    http.listen(port, () => {
      logger.info(
        `[RunServer][websocketInit]-> Websocket is opened on port ${port}`
      );
      io.on("connection", (socket) => {
        console.log(`${socket.id} Connected`);

        mongoModel.findAllChatRoom((err, result) => {
          result.forEach((room) => {
            _id = JSON.stringify(room._id);
            socket.on(_id, (message) => {
              console.log(`[Websocket][sendMessage]-> ${_id}: ${message}`);
            });
          });
        });
        socket.on("enterRoom", (info) => {
          console.log(`[Websocket][enterRoom]-> ${info}`);
          const { roomId } = info;
          socket.on(roomId, function (message) {
            console.log(`[Websocket][sendMessage]-> ${roomId}: ${message}`);

            socket.emit(roomId, message);
          });
        });
        socket.on("createRoom", (_id) => {
          socket.on(_id, (message) => {
            console.log(`[Websocket][sendMessage]-> ${roomId}: ${message}`);
          });
        });
      });
    });

    resolve();
  });
};

module.exports = websocketServerInit;
