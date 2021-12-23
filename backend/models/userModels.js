let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");

  this.searchId = (id, done) => {
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
    const { userId, password, nickName, hashCode } = context;
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_member (userId, password, nickName, hashCode) VALUES (?, ?, ?, ?)",
        [userId, password, nickName, hashCode],
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
