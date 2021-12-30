CREATE DATABASE bs_auth;

USE bs_auth;

DROP TABLE IF EXISTS tbl_member;
CREATE TABLE `tbl_member` (
  userSeqno int(11) NOT NULL AUTO_INCREMENT,
  userId varchar(20) NOT NULL,
  password varchar(255) NOT NULL,
  nickname varchar(10) NOT NULL,
  avatarUrl varchar(255),
  statusMessage varchar(255),
  register_dt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_dt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  hashCode varchar(255) NOT NULL,
  PRIMARY KEY (userSeqno)
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_map_friend;
CREATE TABLE tbl_map_friend (
  seqno int(11) NOT NULL AUTO_INCREMENT,
  userSeqno int(11) NOT NULL,
  friendSeqno int(11) NOT NULL,
  PRIMARY KEY (seqno),
  FOREIGN KEY (userSeqno)
  REFERENCES tbl_member (userSeqno)
  ON DELETE CASCADE
) CHARSET=UTF8MB4;

DROP TABLE IF EXISTS tbl_map_room;
CREATE TABLE tbl_map_room (
  seqno int(11) NOT NULL AUTO_INCREMENT,
  userSeqno int(11) NOT NULL,
  roomSeqno varchar(255) NOT NULL,
  PRIMARY KEY (seqno),
  FOREIGN KEY (userSeqno)
  REFERENCES tbl_member (userSeqno)
  ON DELETE CASCADE
) CHARSET=UTF8MB4;