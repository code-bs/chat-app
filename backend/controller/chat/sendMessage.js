function publish() {
  return new Promise((resolve, reject) => {
    console.log(this.req.body);
    const message = this.req.body.message;
    const now = new Date();
    console.log(`[chatRouter][sendMessage]-> Sending ${message} at ${now}`);

    this.message = message;
    this.regDate = now;

    resolve();
  });
}

function sendResponse() {
  const response = {};
  response.message = `You sent ${this.message}`;
  response.regDate = this.regDate;

  console.log("[chatRouter][sendMessage]-> Send response");
  this.res.jsonp(response);
}

module.exports = async function (req, res) {
  this.req = req;
  this.res = res;

  try {
    await publish();
    sendResponse();
  } catch (err) {
    console.error(err);
  }
};
