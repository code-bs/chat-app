CREATE DATABASE bs_auth;

USE bs_auth;

DROP TABLE IF EXISTS tbl_member;
CREATE TABLE `tbl_member` (
  userId varchar(20) NOT NULL,
 password varchar(255) NOT NULL,
  nickname varchar(10) NOT NULL,
  avatarUrl varchar(255),
  statusMessage varchar(255) DEFAULT "",
  register_dt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_dt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  hashCode varchar(255) NOT NULL,
  PRIMARY KEY (userId)
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_map_friend;
CREATE TABLE tbl_map_friend (
  _id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  friendId varchar(20) NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (userId)
  REFERENCES tbl_member (userId)
  ON DELETE CASCADE
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_map_room;
CREATE TABLE tbl_map_room (
  _id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  roomId varchar(255) NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (userId)
  REFERENCES tbl_member (userId)
  ON DELETE CASCADE
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_invite_friend;
CREATE TABLE tbl_invite_friend (
  _id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  targetId varchar(20) NOT NULL,
  PRIMARY KEY(_id)
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_invite_room;
CREATE TABLE tbl_invite_room (
  _id int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  roomId varchar(255) NOT NULL,
  PRIMARY KEY(_id)
) CHARSET=UTF8MB4;