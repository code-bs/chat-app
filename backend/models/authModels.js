let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");
  const path = require("path");
  require("dotenv").config({
    path: path.join(
      __dirname,
      `../config/env/${process.env.MODE ? process.env.MODE : "local"}.env`
    ),
  });
  const { REDIS_HOST, REDIS_PORT } = process.env;
  console.log(`REDIS: ${REDIS_HOST}:${REDIS_PORT}`);
  const redis = require("redis");
  const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
  });
  redisClient.connect();

  this.getUser = (id, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member WHERE userId=?",
        [id],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.insertToBlacklist = async (refreshToken, done) => {
    await redisClient.setEx(refreshToken, 604800, "1");
    done(null);
  };

  this.checkTokenInBlacklist = async (refreshToken, done) => {
    const result = await redisClient.get(refreshToken);
    done(null, result);
  };
};

module.exports = function () {
  return new Model();
};
