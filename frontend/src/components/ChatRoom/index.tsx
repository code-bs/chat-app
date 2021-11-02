import react, { useState } from 'react';
import { Layout, Button, Input } from 'antd';
import style from './index.module.scss';

type Message = {
  text: string;
  from: number;
};

const { Header, Content } = Layout;

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');

  const submitMessage = () => {
    if (text.length === 0) return;
    setMessages([...messages, { text, from: 0 }]);
    setText('');
  };

  return (
    <Layout className={style.container}>
      <Header className={style.header}>
        <h3>채팅방</h3>
      </Header>
      <Content className={style.content}>
        <ul className={style.messages}>
          {messages.map(msg => {
            return <li>{msg.text}</li>;
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
