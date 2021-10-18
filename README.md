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

### - 채팅방 생성

URI: `http://{URL}/chat/room` <br/>
Method: POST <br/>
Request Params:

```json
{}
```

Response Payload:

- 테스트

```json
{
  "message": "Chat Room created successfully"
}
```
