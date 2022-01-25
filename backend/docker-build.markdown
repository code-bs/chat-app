# AWS EC2 인스턴스 (Ubuntu)에 Docker 설치

```
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

<br/>

# 도커 이미지 빌드 (로컬에서)

1. Dockerfile 생성 (만드는 법은 내 블로그나, 구글에 검색하면 많이 나옴)

2. 이미지 빌드. 경로는 Dockerfile을 생성한 프로젝트 루트 디렉토리.

```
$ docker build . -t <username>/<image-name>:<image-version>
```

3. `docker images` 로 확인

4. `docker push <username>/<image-name>:<image-version>` 으로 허브에 밀어넣는다.

<br/>

# 외부 환경에서 이미지 Pull

1. `sudo docker login`

2. PULL!

```
$ sudo docker pull <username>/<image-name>:<image-version>
```

3. RUN!

- 환경 변수 설정: `-e`

```
$ sudo docker run -e MODE=prod <image-name>:<image-version>
```

<br/>

# Docker DB 컨테이너 구축

- MySQL

```
$ sudo docker pull mysql:8.0.27

$ sudo docker run --name mysql-container -e MYSQl_ROOT_PASSWORD=qwerty11 -d -p 3306:3306 mysql:8.0.27
```

이대로 뭔가 하려고 하면

```
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

이런거 뜨면서 안 된다. Node.js Express 에서 mysql 미들웨어를 사용할 때 뜨는 에러인데, 아래와 같이 해결하자

```
$ sudo docker exec -it mysql-container bash
```

mysql-container 내부로 들어감.

```
$ mysql -uroot -p
password:
```

패스워드 입력하고 들어가서

```sql
> alter user 'root'@'%' identified with mysql_native_password by 'password';
> flush privileges;
```

하면 되더라.

- MongoDB

```
$ sudo docker pull mongo

$ docker run --name mongodb-container -v ~/data:/data/db -d -p 27017:27017 mongo
```

`-v ~/data:/data/db`는 호스트의 ~/data 디렉토리와 컨테이너의 /data/db 디렉터리를 마운트 시킨다는 의미임. 이런 식으로 볼륨을 설정하지 않으면 컨테이너를 삭제할 때 컨테이너에 저장되어 있는 데이터가 같이 삭제되고 백업이 없게 되니 복구가 불가능함.

- Redis

```bash
$ sudo docker pull redis

$ sudo docker network create redis-net

$ sudo docker run --name redis-container -d -p 6379:6379 redis
```

```

```
