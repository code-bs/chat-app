const crypto = require("crypto");

/* METHODS */
function getUserById(userId) {
  // DB로 부터 ID에 해당하는 유저 정보를 가져옴
  // 1. 있으면 넘어감.
  // 2. 없으면 종료
  return new Promise((resolve, reject) => {
    console.log(`[Auth][getUserById]->${userId}`);
    this.model.getUser(userId, (err, result) => {
      console.log(`[Auth][getUserById]->Result: ${result}`);
      if (err) {
        console.log("ERROR: 500");
        reject({ status: 500, message: "알 수 없는 오류가 발생 하였습니다." });
      } else {
        if (result.length < 1) {
          console.log("ERROR: 400");
          reject({ status: 400, message: "존재하지 않는 아이디 입니다." });
        } else {
          const { userId, password, hashCode } = result[0];
          this.userId = userId;
          this.password = password;
          this.hashCode = hashCode;
          console.log();
          resolve();
        }
      }
    });
  });
}

function validatePassword(password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      this.hashCode,
      100000,
      64,
      process.env.HASH_ALGORITHM,
      (err, key) => {
        if (key.toString("base64") === this.password) resolve();
        else {
          reject({ status: 400, message: "비밀번호가 틀렸습니다." });
        }
      }
    );
  });
}

/* JSON WEB TOKEN METHODS 추가 필요 */

/* EXPORTS */
async function login(context, done) {
  const { userId, password } = context;
  this.model = require("../../models/authModels")();

  try {
    await getUserById(userId);
    await validatePassword(password);

    done(null, {
      accessToken: "abcd",
      refreshToken: "efgh",
    });
  } catch (err) {
    done(err, null);
  }
}

module.exports = function (req, res) {
  const context = req.body;
  login(context, (err, payload) => {
    if (err) {
      console.log("??????:", err);
      res.status(err.status).send(err.message);
    } else {
      res.send(payload);
    }
  });
};
