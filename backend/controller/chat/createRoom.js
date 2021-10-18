function createRoom() {
  return new Promise((resolve, reject) => {
    console.log("[chatRouter][createRoom]-> Room is Created!");
    resolve();
  });
}

function sendResponse() {
  const response = {};

  response.message = "Chat Room created successfully";
  console.log("[chatRouter][createRoom]-> Send Response");

  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  this.req = req;
  this.res = res;

  try {
    await createRoom();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
