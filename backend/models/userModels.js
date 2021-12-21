const UserSchema = require("./schemas/user");
let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");

  this.searchId = (id, done) => {
    console.log(`[MODEL][SearchID] -> ${id}`);
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where userId=?",
        [id],
        (err, result) => {
          if (err) done(err, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  this.searchNickname = (nickName, done) => {
    console.log(`[MODEL][SearchNickname]->${nickName}`);
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where nickName=?",
        [nickName],
        (err, result) => {
          if (err) done(err, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  this.insertUser = (context, done) => {
    const { userId, password, nickName } = context;
    console.log(`[MODEL][InsertUser] -> ID:${userId} / nickname:${nickName}`);

    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_member (userId, password, nickName) VALUES (?, ?, ?)",
        [userId, password, nickName],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };
};

module.exports = function () {
  return new Model();
};
