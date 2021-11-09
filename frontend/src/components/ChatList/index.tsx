import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { useChatState, useChatDispatch, getChatRoomList } from '../../contexts';
import style from './index.module.scss';

const ChatList = () => {
  const { rooms } = useChatState();
  const chatDispatch = useChatDispatch();
  useEffect(() => {
    getChatRoomList(chatDispatch);
  }, [chatDispatch]);
  return (
    <Menu className={style.container} theme="dark">
      {rooms.map(room => {
        return (
          <Menu.Item key={room.roomName} className={style.item}>
            {room.roomName}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export { ChatList };
