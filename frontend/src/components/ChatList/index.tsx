import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Confirm } from '..';
import { useChatDispatch, selectRoom } from '../../contexts';
import style from './index.module.scss';
import { createChatRoomAsync } from '../../store/chat/actions';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const ChatList = () => {
  const auth = useAppSelector(state => state.auth);
  const chat = useAppSelector(state => state.chat);
  const rooms = chat.chatRoomList.data || [];
  const { signin } = auth;
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const chatDispatch = useChatDispatch();
  const dispatch = useAppDispatch();
  const onCreateButton = () => {
    if (!signin.data) {
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
          dispatch(createChatRoomAsync.request({ roomName: value, userId: signin.data?.user.userId || '' }));
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
