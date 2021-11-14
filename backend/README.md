# API 정의

서버 실행 후 알맞는 환경의 주소로 접속

- local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- dev: `-`
- prod: `-`

<br/>

---

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

---

# Websocket (socket.io)

채팅창 입장 API 호출 후 "OK" 메시지를 받았다면 웹 소켓으로 연결 필요. 로컬 테스트의 경우 `http://localhost:8888`. 웹 소켓은 socket.io 라이브러리로 구현됨.

1. 방 입장 시 `enterRoom` 이라는 Namespace 로 emit 해야함. 함께 보낼 데이터 객체의 포맷은 아래와 같음. <br/> (\* 입장할 방과 관련된 데이터가 늘어나면 추가하기 용이하도록 JSON 형태로 우선 설정함. 필요없다면 문자열로 수정 가능)

```js
// 예시 (json 보내는 방식이 아래와 같은지 확실치 않음 ^오^)
socket.emit(
  "enterRoom",
  JSON.stringify({
    roomId: "616fbf554de5ad3d62841be8",
  })
);
```

2. 이 후 채팅 메시지는 직전에 보낸 방 고유번호 Namespace 로 emit 및 on 한다.

```js
const roomId = "616fbf554de5ad3d62841be8";

/* 메시지 보내기 */
socket.emit(roomId, "안녕하세요!");

/* 메시지 받기 */
socket.on(roomId, (message) => {
  console.log(message);
});
```

이해를 위한 예시이며, 클라이언트에서 어떻게 할 지는 알아보셔야 함. 아래 참고했던 자료 나열해드림. <br/> 서버 동작 테스트는 [SocketIO Client Tool](https://amritb.github.io/socketio-client-tool/) 에서 해봤고, 큰 문제 없어보였음.

참고 자료:

- [Node.js Socket.IO 사용 방법](https://jsikim1.tistory.com/165)
- [[프로젝트]채팅앱기본 React에서 Socket.io를 사용해보자(node.js)](https://coding-hwije.tistory.com/24)
- [Node.js 와 Socket.io 를 이용한 채팅 구현 (1)](https://berkbach.com/node-js%EC%99%80-socket-io%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84-1-cb215954847b)
- [Socket.io 를 사용한 실시간 채팅 애플리케이션](https://poiemaweb.com/nodejs-socketio)
