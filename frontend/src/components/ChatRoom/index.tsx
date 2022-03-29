import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Button, Input, Divider } from 'antd';
import { CloseCircleFilled, MenuOutlined } from '@ant-design/icons';
import { SpeechBubble } from '..';
import { ChatLog, SigninResponse } from '../../types';
import style from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RoomInfoDrawer } from '..';
import { sendMessage } from '../../store/chat/actions';
import { formatDate } from '../../utils';
const { Header, Content } = Layout;

const ChatRoom = () => {
  const { roomId } = useParams();
  const [text, setText] = useState<string>('');
  const [roomInfoVisible, setRoomInfoVisible] = useState<boolean>(false);

  const rooms = useAppSelector(state => state.chat.chatRoomList.data) || [];
  const messageListRef = useRef<HTMLUListElement>(null);
  const {
    user: { avatarUrl, nickname, statusMessage, userId },
  } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const dispatch = useAppDispatch();
  const selectedRoom = rooms.find(room => room._id === roomId);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedRoom]);
  const submitMessage = () => {
    if (text.length === 0) return;
    dispatch(
      sendMessage({
        roomId: roomId as string,
        userId,
        nickname,
        avatarUrl,
        statusMessage,
        message: text,
      }),
    );
    setText('');
  };
  if (!selectedRoom) {
    return (
      <Layout className={style.container}>
        <CloseCircleFilled />
        <p>찾으시는 방이 존재하지 않습니다!</p>
      </Layout>
    );
  }
  const histories = selectedRoom.chatHistory.reduce((acc: ChatLog[][], cur: ChatLog) => {
    if (
      acc.length === 0 ||
      new Date(acc[acc.length - 1][0].regDate).toDateString() !== new Date(cur.regDate).toDateString()
    ) {
      acc.push([cur]);
    } else {
      acc[acc.length - 1].push(cur);
    }
    return acc;
  }, []);
  return (
    <Layout className={style.container}>
      <Header className={style.header}>
        <h3>{selectedRoom.roomName}</h3>
        <Button
          className={style.btnMore}
          icon={<MenuOutlined />}
          size="large"
          onClick={() => setRoomInfoVisible(true)}
        />
      </Header>
      <Content className={style.content}>
        <ul className={style.messages} ref={messageListRef}>
          {histories.map(history => {
            return (
              <>
                <Divider plain>{formatDate(history[0].regDate)}</Divider>
                {history.map(chatLog => (
                  <SpeechBubble chatLog={chatLog} key={`${chatLog.regDate}`} fromMe={chatLog.userId === userId} />
                ))}
              </>
            );
          })}
        </ul>
        <div className={style.userInput}>
          <Input value={text} onChange={e => setText(e.target.value)} onPressEnter={submitMessage}></Input>
          <Button type="primary" onClick={submitMessage} disabled={text.length === 0}>
            전송
          </Button>
        </div>
      </Content>
      <RoomInfoDrawer roomInfoVisible={roomInfoVisible} closeRoomInfo={() => setRoomInfoVisible(false)} />
    </Layout>
  );
};

export { ChatRoom };
