function getRoom() {
  return new Promise((resolve, reject) => {
    const roomId = this.req.params.roomId;
    console.log(`[chatRouter][enterRoom]-> Enter to ${roomId}`);
    console.log(`[chatRouter][enterRoom]-> Searching...`);

    this.room = {};
    this.room.roomId = roomId;
    this.room.users = ["a", "b", "c"];
    this.room.history = ["Hello", "World", "Welcome to Chat"];
    resolve();
  });
}

function subscribeRoom() {
  return new Promise((resolve, reject) => {
    console.log(`[chatRouter][enterRoom]-> Request Subscribe to mqtt`);

    resolve();
  });
}

function sendResponse() {
  const response = {};

  response.message = `Enter to ${this.req.params.roomId} successfully`;
  response.room = {
    id: this.room.roomId,
    users: this.room.users,
    history: this.room.history,
  };

  console.log("[chatRouter][enterRoom]-> Send response");

  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  this.req = req;
  this.res = res;

  try {
    await getRoom();
    await subscribeRoom();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
