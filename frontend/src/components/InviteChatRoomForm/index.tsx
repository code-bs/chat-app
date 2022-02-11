import React from 'react';
import { Modal, Button, Popconfirm } from 'antd';
import { useAppSelector } from '../../store/hooks';
import { UserSummaryList } from '..';

type InviteChatRoomFormProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const InviteChatRoomForm = ({ isModalVisible, closeModal }: InviteChatRoomFormProps) => {
  const friends = useAppSelector(state => state.user.friendList.data) || [];
  return (
    <Modal
      title="채팅방 초대"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}
      footer={null}>
      <UserSummaryList
        data={friends}
        createActions={({ userId, nickname }) => {
          return [
            <Popconfirm title={`${nickname}님을 채팅방에 초대하시겠습니까?`} onConfirm={() => {}}>
              <Button type="primary">초대</Button>
            </Popconfirm>,
          ];
        }}
      />
    </Modal>
  );
};

export { InviteChatRoomForm };
