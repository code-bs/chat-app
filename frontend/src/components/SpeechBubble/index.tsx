import React from 'react';
import { ChatLog } from '../../types';
import { formatTime } from '../../utils';
import style from './index.module.scss';

type SpeechBubbleProps = {
  chatLog: ChatLog;
  fromMe: boolean;
};

const SpeechBubble = ({ chatLog, fromMe }: SpeechBubbleProps) => {
  const { message, regDate } = chatLog;
  return (
    <div className={`${style.container} ${fromMe ? style.fromMe : ''}`}>
      <span className={style.time}>{formatTime(regDate)}</span>
      <div className={style.speechBubble}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export { SpeechBubble };
