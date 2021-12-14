import React, { useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Confirm } from '..';
import { useChatState, useChatDispatch, useAuthState, createChatRoom, selectRoom } from '../../contexts';
import style from './index.module.scss';

const ChatList = () => {
  const { rooms } = useChatState();
  const { userId } = useAuthState();
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const chatDispatch = useChatDispatch();
  const onCreateButton = () => {
    if (!userId) {
      alert('로그인이 필요합니다');
      return;
    }
    setConfirmVisible(true);
  };
  return (
    <div className={style.container}>
      <Menu
        theme="dark"
        onClick={({ key }) => {
          selectRoom(chatDispatch, key);
        }}>
        {rooms.map(room => {
          return (
            <Menu.Item key={room._id} className={style.item}>
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
        onClick={onCreateButton}
      />
      <Confirm
        onCancel={() => {
          setConfirmVisible(false);
        }}
        onSubmit={value => {
          createChatRoom(chatDispatch, { roomName: value, userId: userId });
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
