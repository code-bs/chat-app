import React, { useState } from 'react';
import { Menu, Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useMatch } from 'react-router-dom';
import { Confirm } from '..';
import style from './index.module.scss';
import { createChatRoomAsync } from '../../store/chat/actions';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const ChatList = () => {
  const match = useMatch('/chat/:roomId');
  const roomId = match?.params.roomId || '';
  const auth = useAppSelector(state => state.auth);
  const chat = useAppSelector(state => state.chat);
  const navigate = useNavigate();
  const rooms = chat.chatRoomList.data || [];
  const { signin } = auth;
  const userId = signin.data?.user.userId as string;

  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
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
        selectedKeys={[roomId]}
        onClick={({ key }) => {
          navigate(key);
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
          if (!value) {
            return;
          }
          dispatch(createChatRoomAsync.request({ roomName: value }));
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
