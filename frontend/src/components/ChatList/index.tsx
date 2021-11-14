import React, { useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Confirm } from '..';
import { useChatState, useChatDispatch, getChatRoomList } from '../../contexts';
import style from './index.module.scss';

const ChatList = () => {
  const { rooms } = useChatState();
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const chatDispatch = useChatDispatch();
  useEffect(() => {
    getChatRoomList(chatDispatch);
  }, [chatDispatch]);
  return (
    <div className={style.container}>
      <Menu theme="dark">
        {rooms.map(room => {
          return (
            <Menu.Item key={room.roomName} className={style.item}>
              {room.roomName}
            </Menu.Item>
          );
        })}
      </Menu>
      <Button
        className={style.btn_add}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setConfirmVisible(true)}
      />
      <Confirm
        onCancel={() => {
          setConfirmVisible(false);
        }}
        onSubmit={() => {
          setConfirmVisible(false);
        }}
        title="채팅방 생성"
        message="채팅방 이름을 입력하시오."
        isModalVisible={confirmVisible}
        withInput={true}
      />
    </div>
  );
};

export { ChatList };
