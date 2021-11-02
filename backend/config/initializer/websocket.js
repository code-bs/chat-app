const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8888;
const logger = require("../logger");

const websocketServerInit = () => {
  return new Promise((resolve, reject) => {
    http.listen(port, () => {
      logger.info(
        `[RunServer][websocketInit]-> Websocket is opened on port ${port}`
      );
      io.on("connection", (socket) => {
        console.log(`${socket.id} Connected`);

        socket.on("enterRoom", (info) => {
          console.log(`[Websocket][enterRoom]-> ${info}`);
          const roomInfo = new Object();
          roomInfo.id = info.roomId;
          socket.on(roomInfo.id, function (message) {
            console.log(
              `[Websocket][sendMessage]-> ${roomInfo.id}: ${message}`
            );

            socket.emit(roomInfo.id, message);
          });
        });
      });
    });

    resolve();
  });
};

module.exports = websocketServerInit;
