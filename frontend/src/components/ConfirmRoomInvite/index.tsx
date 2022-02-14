import React from 'react';
import { Modal, Button, List } from 'antd';
import { useAppSelector } from '../../store/hooks';

type ConfirmRoomInviteProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmRoomInvite = ({ isModalVisible, closeModal }: ConfirmRoomInviteProps) => {
  const { data } = useAppSelector(state => state.chat.roomInvite);
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
        renderItem={({ roomName }) => (
          <List.Item
            actions={[
              <Button type="primary">수락</Button>,
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
