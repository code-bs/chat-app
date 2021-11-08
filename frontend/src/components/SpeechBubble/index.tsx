import React from 'react';
import { ChatLog } from '../../types';
import { formatTime } from '../../utils';
import style from './index.module.scss';

type SpeechBubbleProps = {
  chatLog: ChatLog;
};

const SpeechBubble = ({ chatLog }: SpeechBubbleProps) => {
  const { message, regDate } = chatLog;
  return (
    <div className={style.container}>
      <span className={style.time}>{formatTime(regDate)}</span>
      <div className={style.speechBubble}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export { SpeechBubble };
