/* METHODS */
function findUser() {
  return new Promise((resolve, reject) => {});
}

function insertFriend() {
  return new Promise((resolve, reject) => {});
}

/* EXPORTS */
async function addFriend(context, callback) {
  this.model = require("../../models/userModels");
  try {
    await findUser();
    await insertFriend();

    callback(null, response);
  } catch (err) {
    if (!err.status)
      callback(
        {
          status: 500,
          error: err,
          message: "알 수 없는 오류가 발생하였습니다.",
        },
        null
      );
    else callback(err, null);
  }
}

module.exports = function (req, res) {
  const context = req.body;

  addFriend(context, (err, result) => {
    if (err) {
      console.error(err);
      res.status(err.status).send(err.message);
    } else {
      res.send(result);
    }
  });
};
