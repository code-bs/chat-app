/**
 * 유저 생성
 * 1. request body 검증
 * 2. 아이디 중복 확인
 * 3. 닉네임 중복 확인
 * 4. 비밀번호 encode
 * 5. DB 저장
 * 6. send response
 */
function checkRequestBody() {
  return new Promise((resolve, reject) => {
    const { userId, userName, password } = req.body;
    this.logger.info(`[userRouter][createUser]->
    Check Req Body
    ID: ${userId}
    nickname: ${userName}`);

    if (!userId)
      reject({
        statusCode: 400,
        controller: "createUser",
        message: "userId undefined",
      });
    if (!userName)
      reject({
        statusCode: 400,
        controller: "createUser",
        message: "userName undefined",
      });
    if (!password)
      reject({
        statusCode: 400,
        controller: "createUser",
        message: "password undefined",
      });

    this.userId = userId;
    this.userName = userName;
    this.password = password;
    resolve();
  });
}

function isIdDuplicated() {
  return new Promise((resolve, reject) => {
    this.logger.info(`[userRouter][createUser]->Check ID: ${this.userId}`);

    resolve();
  });
}

function isNicknameDuplicated() {
  return new Promise((resolve, reject) => {
    this.logger.info(
      `[userRouter][createUser]->Check Nickname: ${this.userName}`
    );

    resolve();
  });
}

function encodePassword() {
  return new Promise((resolve, reject) => {
    this.logger.info(`[userRouter][createUser]->Encode Password`);

    resolve();
  });
}

function saveUserData() {
  return new Promise((resolve, reject) => {
    this.logger.info(`[userRouter][createUser]-> Saving to DB`);

    resolve();
  });
}

function sendResponse() {
  res.send("OK");
}

module.exports = async function (req, res) {
  const errorHandler = require("../common/errorHandler");
  this.logger = require("../../config/logger");
  this.model = require("../../models/userModels")({});
  this.req = req;
  this.res = res;

  try {
    await checkRequestBody();
    await isIdDuplicated();
    await isNicknameDuplicated();
    await encodePassword();
    await saveUserData();
    sendResponse();
  } catch (err) {
    errorHandler(err);
  }
};
