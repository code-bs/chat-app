# API 정의

서버 실행 후 알맞는 환경의 주소로 접속

- local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- dev: `-`
- prod: `-`

<br/>

# MongoDB 설치 (macOS)

```
$ brew tap mongodb/brew
$ brew install mongodb-community
```

만약 `brew link mongodb-community` 가 포함된 Warning 메시지가 뜨면 이대로 실행.

```
$ brew link mongodb-community
```

<br/>

## MongoDB 실행

```
$ brew services start mongodb-community
```

제대로 실행되었나 확인하기 위해서는 [http://localhost:27017](http://localhost:27017) 에 접속해보고,

"It looks like you are ...." 이런 메시지가 나왔으면 잘 된 것임.

<br/>

# Websocket (socket.io)

참고 자료:

- [Node.js Socket.IO 사용 방법](https://jsikim1.tistory.com/165)
- [[프로젝트]채팅앱기본 React에서 Socket.io를 사용해보자(node.js)](https://coding-hwije.tistory.com/24)
- [Node.js 와 Socket.io 를 이용한 채팅 구현 (1)](https://berkbach.com/node-js%EC%99%80-socket-io%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84-1-cb215954847b)
- [Socket.io 를 사용한 실시간 채팅 애플리케이션](https://poiemaweb.com/nodejs-socketio)

<br/>

# MySQL 설치

macOS 의 경우 homebrew 로 설치.

```bash
$ brew install mysql
```

현재 설치된 mysql 의 버전.

```bash
mysql: stable 8.0.27 (bottled)
```

user 설정 후 `/env/local.env` 에 새로운 환경 변수 추가

```
## MySQL Configuration ##
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB="bs_auth"
```

MYSQL_DB 는 "bs_auth" 로 고정.

기초 구조는 `/setup/schema.sql` 의 SQL문을 차례로 실행.

# 비밀번호 암호화 알고리즘

비밀번호 암호화 로직이 들어가있는 상태이며, 알고리즘 코드를 추가해줘야 함. "sha512" 를 쓰는 것을 권장하나, 원하는 것을 넣어도 됨

```
## General Configuration ##
HASH_ALGORITHM="sha512"
```

# 환경 변수 정리

```
## General Configuration ##
HASH_ALGORITHM="sha512"

## JWT Configuration ##
JWT_SECRET="HELLO"

## HTTP Server Configuration ##
PORT=3000
SOCKET_PORT=8888

## MySQL Configuration ##
MYSQL_HOST="127.0.0.1"
MYSQL_PORT=3306
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DB="bs_auth"
```
