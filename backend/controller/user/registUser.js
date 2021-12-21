const crypto = require("crypto");

/**
 * METHODS
 */

function checkIdDuplication(userId) {
  return new Promise((resolve, reject) => {
    this.model.searchId(userId, (err, res) => {
      if (err) reject(err);

      if (res.length > 0)
        reject({ status: 400, message: "중복된 아이디 입니다." });
      else {
        console.log("NEW ID :D");
        resolve();
      }
    });
  });
}

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(
        password,
        buf.toString("base64"),
        100000,
        64,
        "sha512",
        (err, key) => {
          if (err) reject(err);
          resolve(key.toString("base64"));
        }
      );
    });
  });
}

function checkNickNameDuplication(nickName) {
  return new Promise((resolve, reject) => {
    console.log(`[User][CheckNicknameDup]->${nickName}`);
    this.model.searchNickname(nickName, (err, res) => {
      console.log("중복닉네임검사:", res.length);
      if (err)
        reject({ status: 500, message: "알 수 없는 에러가 발생하였습니다." });
      else {
        if (res.length > 0)
          reject({ status: 400, message: "중복된 닉네임 입니다." });
        else resolve();
      }
    });
  });
}

function insertNewUser(context) {
  return new Promise((resolve, reject) => {
    console.log("새로운 유저를 등록합니다.");
    this.model.insertUser(context, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * EXPORTS
 */
async function register(context, done) {
  const { userId, password, nickName } = context;
  this.model = require("../../models/userModels")();
  try {
    await checkIdDuplication(userId);
    const ePassword = await encryptPassword(password);
    await checkNickNameDuplication(nickName);
    await insertNewUser({ userId, password: ePassword, nickName });

    done(null, {
      userId,
      password,
      nickName,
    });
  } catch (error) {
    done(error, null);
  }
}

module.exports = function (req, res) {
  const context = req.body;

  register(context, (err, context) => {
    if (err) {
      res.status(err.status).send(err.message);
    } else {
      res.send(context);
    }
  });
};
