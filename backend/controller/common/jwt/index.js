/* IMPORTS */
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../env/local.env"),
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

function validate(req, res, next) {
  const { access_token } = req.headers;
  jwt.verify(access_token, JWT_SECRET, (error, decoded) => {
    if (error) {
      const { refreshToken } = req.cookies;
      jwt.verify(refreshToken, JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(404).send("세션이 만료되었습니다.");
          return;
        } else {
          const { userSeqno, userId, nickname } = decoded;
          generate({ userSeqno, userId, nickname })
            .then((token) => {
              res.header("access_token", token);
              next();
            })
            .catch((error) => {
              res.status(500).send("알 수 없는 오류가 발생하였습니다.");
              return;
            });
        }
      });
    } else next();
  });
}

/* EXPORTS */
module.exports = {
  generate,
  generate_refresh,
  validate,
};
