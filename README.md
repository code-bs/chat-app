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

# API 정의

## 채팅방

MongoDB - roomSchema

```js
{
  roomId: String, // 방 고유 id
  roomName: String,  // 방 이름 (사용자 지정)
  regDate: Date,  // 생성일
  masterUserId: String,  // 생성한 유저의 고유 id
  chatHistory: [  // 채팅 History
    {
      message: String,
      regDate: Date,
      sentUserId: String,
    },
  ],
}
```

### - 채팅방 생성

URI: `http://{URL}/chat/room` <br/>
Method: POST <br/>
Request Header: - 없음 - <br/>
Request Params:

```js
{
  roomName, // 방 이름 (사용자 지정)
  userId, // 사용자 고유 id (회원가입 시 생성된 고유 번호)
}
```

Response Payload:

- 성공

```js
{
  "message": "Chat Room created successfully",
  "room": {
    "roomName",
    "regDate",
    "masterUserId",
    "chatHistory",
    "_id",
  }
}
```

예시

```json
{
  "message": "Chat Room created successfully",
  "room": {
    "roomName": "Testroom1",
    "regDate": "2021-10-20T07:04:45.968Z",
    "masterUserId": "1a2a3a",
    "chatHistory": [],
    "_id": "616fbf8d23e84fa3421422c5",
    "__v": 0
  }
}
```

- 실패 코드

| status | message              | description  |
| ------ | -------------------- | ------------ |
| 400    | "roomName undefined" | 방 이름 없음 |
| 400    | "userId undefined"   | 유저 id 없음 |
| 500    | -                    | 서버 오류    |

<br/>

---

### - 채팅방 목록 조회

URI: `http://{URL}/chat/room` <br/>
Method: GET <br/>
Request Header: - 없음 - <br/>
Request Params: - 없음 - <br/>
Response Payload:

예시

```json
{
  "rooms": [
    {
      "_id": "616fbf554de5ad3d62841be8",
      "roomName": "Testroom1",
      "regDate": "2021-10-20T07:03:49.199Z",
      "masterUserId": "1a2a3a",
      "chatHistory": [],
      "__v": 0
    },
    {
      "_id": "616fbf884de5ad3d62841bea",
      "roomName": "Testroom1",
      "regDate": "2021-10-20T07:04:40.210Z",
      "masterUserId": "1a2a3a",
      "chatHistory": [],
      "__v": 0
    },
    {
      "_id": "616fbf8d23e84fa3421422c5",
      "roomName": "Testroom1",
      "regDate": "2021-10-20T07:04:45.968Z",
      "masterUserId": "1a2a3a",
      "chatHistory": [],
      "__v": 0
    }
  ]
}
```

<br/>

---

### 채팅방 입장

URI: `http://{URL}/chat/room/enter/:roomId` <br/>
Method: GET <br/>
Request Header: - 미정 - <br/>
Request Params: - 미정 - <br/>
Response Payload:

```js
{
  message: "OK",
  roodId,  // 방 고유번호
  chatHistory: [
    {
      message,  // 채팅 메시지
      regDate,  // 전송일
      userId,  // 전송자(유저 고유번호)
      _id,  // db seqno
    }
  ]
}
```

예시

```json
{
  "message": "OK",
  "roomId": "616fbf554de5ad3d62841be8",
  "chatHistory": [
    {
      "message": "\"Hello I'm Hyunwoo Kim!\"",
      "regDate": "2021-10-22T08:01:30.043Z",
      "userId": "hyunwoo045",
      "_id": "61726fda525c682f1f20a8c1"
    },
    {
      "message": "안녕하세요 :D",
      "regDate": "2021-10-22T08:26:05.136Z",
      "userId": "hyunwoo045",
      "_id": "6172759dd2e87132f426a2a6"
    }
  ]
}
```

<br/>

---

### 메시지 입력

URI: `http://{URL}/chat/room/enter/:roomId` <br/>
Method: GET <br/>
Request Header: - 없음 - <br/>
Request Params:

```js
{
  userId,  // 유저 고유번호
  message,  // 채팅 내용
  roomId,  // 방 고유번호
}
```

Response Payload: - 없음 -
