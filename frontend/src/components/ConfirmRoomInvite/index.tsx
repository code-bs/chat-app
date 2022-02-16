import React from 'react';
import { Modal, Button, List } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SigninResponse } from '../../types';
import { joinChatRoomAsync } from '../../store/chat/actions';

type ConfirmRoomInviteProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmRoomInvite = ({ isModalVisible, closeModal }: ConfirmRoomInviteProps) => {
  const {
    user: { userId },
  } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const { data } = useAppSelector(state => state.chat.roomInvite);
  const dispatch = useAppDispatch();
  return (
    <Modal
      title="방 초대"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}
      footer={null}>
      <List
        itemLayout="horizontal"
        dataSource={data || []}
        style={{ padding: '16px 24px' }}
        renderItem={({ _id, roomName }) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => dispatch(joinChatRoomAsync.request({ userId, roomId: _id }))}>
                수락
              </Button>,
              <Button type="primary" danger>
                거절
              </Button>,
            ]}>
            <p>{roomName}방에서 초대가 왔습니다.</p>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export { ConfirmRoomInvite };
