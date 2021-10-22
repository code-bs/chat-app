const mqtt = require("mqtt");

function mqttSender(topic, message) {
  console.log(`Publishing ${topic} ${message}`);
  client = mqtt.connect("ws://localhost:8888");
  client.publish(topic, message);
}

module.exports = mqttSender;
