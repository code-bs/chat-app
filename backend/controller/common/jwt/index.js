/* IMPORTS */
const jwt = require("jsonwebtoken");
const path = require("path");
const logger = require("../../../config/logger");
require("dotenv").config({
  path: path.join(
    __dirname,
    `../env/${process.env.MODE ? process.env.MODE : "local"}.env`
  ),
});
const JWT_SECRET = process.env.JWT_SECRET;

/* METHODS */
function generate(context) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      context,
      JWT_SECRET,
      { expiresIn: "15m", issuer: "CODEBS" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
}

function generate_refresh(context) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      context,
      JWT_SECRET,
      { expiresIn: "7d", issuer: "CODEBS" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
}

function validate_refresh(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, JWT_SECRET, (error, decoded) => {
      if (error) reject({ status: 403, message: "세션 만료" });
      else {
        resolve(decoded);
      }
    });
  });
}

function validate(req, res, next) {
  const { access_token } = req.headers;
  jwt.verify(access_token, JWT_SECRET, (error, decoded) => {
    if (error) {
      logger.info(`[JWT][validate]-> access token 만료`);
      res.status(403).send("access token 만료");
    } else {
      req.user = decoded;
      next();
    }
  });
}

/* EXPORTS */
module.exports = {
  generate,
  generate_refresh,
  validate,
  validate_refresh,
};
