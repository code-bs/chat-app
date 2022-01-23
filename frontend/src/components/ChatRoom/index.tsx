import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Button, Input } from 'antd';
import { SpeechBubble } from '..';
import { ChatLog } from '../../types';
import { CloseCircleFilled } from '@ant-design/icons';
import style from './index.module.scss';
import { useAppSelector } from '../../store/hooks';
import { useChatState, useChatDispatch, sendMessage } from '../../contexts';
const { Header, Content } = Layout;

const ChatRoom = () => {
  const { roomId } = useParams();
  const [text, setText] = useState<string>('');

  const rooms = useAppSelector(state => state.chat.chatRoomList.data) || [];
  const chatDispatch = useChatDispatch();
  const selectedRoom = rooms.find(room => room._id === roomId);
  const submitMessage = () => {
    if (text.length === 0) return;
    sendMessage(chatDispatch, roomId as string, text);
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
  return (
    <Layout className={style.container}>
      <Header className={style.header}>
        <h3>{selectedRoom.roomName}</h3>
      </Header>
      <Content className={style.content}>
        <ul className={style.messages}>
          {selectedRoom.chatHistory.map(chatLog => {
            return <SpeechBubble chatLog={chatLog} key={`${chatLog.regDate}`} />;
          })}
        </ul>
        <div className={style.userInput}>
          <Input value={text} onChange={e => setText(e.target.value)} onPressEnter={submitMessage}></Input>
          <Button type="primary" onClick={submitMessage} disabled={text.length === 0}>
            전송
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export { ChatRoom };
