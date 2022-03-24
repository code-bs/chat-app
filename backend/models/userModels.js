let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");
  const userSchema = require("./schemas/user");

  this.newSocketInfo = async (userId, socketId, done) => {
    const newSocket = new userSchema({ userId, socketId });
    try {
      const result = await newSocket.save();
      done(null, result);
    } catch (err) {
      done(err, null);
    }
  };

  this.getSocketId = async (userId, done) => {
    try {
      const result = await userSchema.find({ userId: userId });
      done(null, result);
    } catch (err) {
      done(err, null);
    }
  };

  this.deleteSocketInfo = async (socketId, done) => {
    try {
      await userSchema.deleteOne({ socketId });
    } catch (err) {
      done(err, null);
    }
  };

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

  this.searchNickname = (nickname, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where nickname=?",
        [nickname],
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
    const { userId, password, nickname, hashCode, avatarUrl, statusMessage } =
      context;
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_member (userId, password, nickname, hashCode, avatarUrl, statusMessage) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, password, nickname, hashCode, avatarUrl, statusMessage],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.getUserInfo = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT userId, nickname, avatarUrl, statusMessage FROM tbl_member WHERE userId=?",
        [userId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };
  this.searchIdBySubstr = (substr, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT userId, nickname, avatarUrl, statusMessage FROM tbl_member WHERE userId LIKE ?; ",
        [substr],
        (error, result) => {
          if (error) done(error, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  /* 친구 */
  this.addFriend = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_map_friend (userId, friendId) VALUES(?, ?)",
        [userId, friendId],
        (error) => {
          if (error) done(error);
          else done(null);
        }
      );
    });
  };

  this.getFriendList = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickname, m.avatarUrl, m.statusMessage FROM tbl_map_friend as f INNER JOIN tbl_member as m ON m.userId=f.friendId WHERE f.userId=?",
        [userId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.isFriend = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT _id FROM tbl_map_friend WHERE userId=? AND friendId=?",
        [userId, friendId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.deleteFriend = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "DELETE FROM tbl_map_friend WHERE userId=? AND friendId=?",
        [userId, friendId],
        (err) => {
          if (err) done(err);
        }
      );
      conn.query(
        "DELETE FROM tbl_map_friend WHERE userId=? AND friendId=?",
        [friendId, userId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  /* 친구 요청 관련 */
  this.invite = (userId, targetId, done) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_invite_friend (userId, targetId, curStatus) VALUES(?, ?, 'ND')",
        [userId, targetId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.checkInvite = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_invite_friend WHERE userId=? AND targetId=? AND curStatus='ND'",
        [userId, friendId],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
    });
  };

  this.getFriendReqs = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickname, m.avatarUrl, m.statusMessage, f.curStatus FROM tbl_invite_friend as f INNER JOIN tbl_member as m ON f.userId=m.userId WHERE f.targetId=? AND f.curStatus='ND'",
        [userId],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.getFriendSentReqs = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickname, m.avatarUrl, m.statusMessage, f.curStatus FROM tbl_invite_friend as f INNER JOIN tbl_member as m ON f.targetId=m.userId WHERE f.userId=?",
        [userId],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
    });
  };

  this.acceptInvite = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "UPDATE tbl_invite_friend SET curStatus='Y' WHERE userId=? AND targetId=?",
        [userId, friendId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.rejectInvite = (senderId, userId, done) => {
    _mysql((conn) => {
      conn.query(
        "UPDATE tbl_invite_friend SET curStatus='N' WHERE userId=? AND targetId=?",
        [senderId, userId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.deleteInvite = (senderId, userId, done) => {
    _mysql((conn) => {
      conn.query(
        "DELETE FROM tbl_invite_friend WHERE userId=? AND targetId=?",
        [senderId, userId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  /* 프로필 업데이트 관련 */
  this.updateProfile = (userId, profile, done) => {
    const { nickname, avatarUrl, statusMessage } = profile;
    _mysql((conn) => {
      conn.query(
        "UPDATE tbl_member SET nickname=?, avatarUrl=?, statusMessage=? WHERE userID=?",
        [nickname, avatarUrl, statusMessage, userId],
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
