function createRoom() {
  return new Promise((resolve, reject) => {
    console.log("[chatRouter][createRoom]-> Room is Created!");
    resolve();
  });
}

function sendResponse() {
  console.log("[chatRouter][createRoom]-> Send Response");
  this.res.send("Room is Created!");
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
