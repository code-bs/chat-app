# API 정의

서버 실행 후 알맞는 환경의 주소로 접속

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

<br/>

# Redis 설치 (macOS)

```bash
$ brew install redis

# 설치 후
$ brew services start redis
```

설치가 잘 되었나 확인해보려면 `redis-cli` 를 쳐보자. `127.0.0.1:6379 >` 와 같은 게 터미널에 뜨면 당신은 보스야.

환경 변수를 추가해줘야 함. 아래에 목차에 한 번에 정리해놓을테니 걍 긁어 쓰셈

[환경 변수 정리](#환경-변수-정리)

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

<br/>

# 비밀번호 암호화 알고리즘

비밀번호 암호화 로직이 들어가있는 상태이며, 알고리즘 코드를 추가해줘야 함. "sha512" 를 쓰는 것을 권장하나, 원하는 것을 넣어도 됨

```
## General Configuration ##
HASH_ALGORITHM="sha512"
```

<br/>

# 환경 변수 정리

```
## General Configuration ##
HASH_ALGORITHM="sha512"

## JWT Configuration ##
JWT_SECRET=""

## HTTP Server Configuration ##
PORT=3000
SOCKET_PORT=8888

## MongoDB Configuration ##
MONGO_HOST="127.0.0.1"
MONGO_PORT=27017

## MySQL Configuration ##
MYSQL_HOST="127.0.0.1"
MYSQL_PORT=3306
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DB="bs_auth"

## Redis Configuration ##
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
```
