function getRooms() {
  return new Promise((resolve, reject) => {
    console.log(`[chatRouter][roomList]-> Getting Room List...`);
    /* Params Check */

    this.model.findAllChatRoom((err, result) => {
      if (err) reject(err);

      console.log(`[chatRouter][roomList]-> Got Room List`);
      this.rooms = result;
      resolve();
    });
  });
}

function sendResponse() {
  const response = {};

  response.rooms = this.rooms;

  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  this.req = req;
  this.res = res;

  this.model = require("../../models/chatModels")({});

  try {
    await getRooms();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
