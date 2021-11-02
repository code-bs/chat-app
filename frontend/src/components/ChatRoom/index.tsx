import react, { useState } from 'react';
import style from './index.module.scss';

type Message = {
  text: string;
  from: number;
};

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  return (
    <div className={style.container}>
      <header>채팅방</header>
      <ul>
        {messages.map(msg => {
          return <li>{msg.text}</li>;
        })}
      </ul>
      <div>
        <input value={text} onChange={e => setText(e.target.value)}></input>
        <button
          onClick={() => {
            setMessages([...messages, { text, from: 0 }]);
            setText('');
          }}>
          전송
        </button>
      </div>
    </div>
  );
};

export { ChatRoom };
