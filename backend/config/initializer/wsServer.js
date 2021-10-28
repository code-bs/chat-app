const aedes = require("aedes")();
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = 8888;

function websocketServerInit() {
  return new Promise((resolve, reject) => {
    ws.createServer({ server: httpServer }, aedes.handle);

    httpServer.listen(port, function () {
      console.log(
        `[RunServer][InitiateWebsocket]-> Websocket is opened on ${port}`
      );
    });

    aedes.on("subscribe", function (subscriptions, client) {
      // console.log(
      //   "MQTT client \x1b[32m" +
      //     (client ? client.id : client) +
      //     "\x1b[0m subscribed to topics: " +
      //     subscriptions.map((s) => s.topic).join("\n"),
      //   "from broker",
      //   aedes.id
      // );
      console.log(`[MQTT Broker]-> Client subscribed: ${subscriptions}`);
    });

    aedes.on("unsubscribe", function (subscriptions, client) {
      // console.log(
      //   "MQTT client \x1b[32m" +
      //     (client ? client.id : client) +
      //     "\x1b[0m unsubscribed to topics: " +
      //     subscriptions.join("\n"),
      //   "from broker",
      //   aedes.id
      // );
      console.log(`[MQTT Broker]-> Client unsubscribed: ${subscriptions}`);
    });

    aedes.on("client", function (client) {
      // console.log(
      //   "Client Connected: \x1b[33m" +
      //     (client ? client.id : client) +
      //     "\x1b[0m",
      //   "to broker",
      //   aedes.id
      // );
      console.log(
        `[MQTT Broker]-> Client connected: ${client ? client.id : client}`
      );
    });

    aedes.on("clientDisconnect", function (client) {
      // console.log(
      //   "Client Disconnected: \x1b[31m" +
      //     (client ? client.id : client) +
      //     "\x1b[0m",
      //   "to broker",
      //   aedes.id
      // );
      console.log(
        `[MQTT Broker]-> Client disconnected: ${client ? client.id : client}`
      );
    });

    aedes.on("publish", (packet) => {
      console.log(`[MQTT Broker]-> Published: ${packet.payload.toString()}`);
      // console.log(packet.payload.toString());
    });
    resolve();
  });
}

module.exports = websocketServerInit;
