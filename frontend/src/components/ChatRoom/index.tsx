import React, { useState } from 'react';
import { Layout, Button, Input } from 'antd';
import { SpeechBubble } from '..';
import { ChatLog } from '../../types';
import style from './index.module.scss';
import { useChatState, useChatDispatch, useAuthState, sendMessage } from '../../contexts';
import { Empty } from 'antd';
const { Header, Content } = Layout;

const ChatRoom = () => {
  const [messages, setMessages] = useState<ChatLog[]>([]);
  const [text, setText] = useState<string>('');
  const { rooms, selectedRoomId } = useChatState();
  const { auth } = useAuthState();
  const chatDispatch = useChatDispatch();
  const selectedRoom = rooms.find(room => room._id === selectedRoomId);
  const submitMessage = () => {
    if (text.length === 0) return;
    // setMessages([...messages, { message: text, userId, regDate: new Date().toString() }]);
    sendMessage(chatDispatch, selectedRoomId, text);
    setText('');
  };
  if (!selectedRoom) {
    return (
      <Layout className={style.container}>
        <Empty description={'Please select chat room!'} />
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
