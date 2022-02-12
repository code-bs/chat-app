import React from 'react';
import { Modal, Button, Popconfirm, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { sendMessage } from '../../store/socket';
import { UserSummaryList } from '..';
import { InviteChatRoomParams, SigninResponse } from '../../types';

type InviteChatRoomFormProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const InviteChatRoomForm = ({ isModalVisible, closeModal }: InviteChatRoomFormProps) => {
  const friends = useAppSelector(state => state.user.friendList.data) || [];
  const {
    user: { userId },
  } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const { roomId } = useParams();
  const inviteChatRoom = ({ nickname, targetId }: { targetId: string; nickname: string }) => {
    sendMessage<InviteChatRoomParams>('invite', {
      targetId,
      userId: userId,
      roomId: roomId as string,
    });
    notification.open({
      message: '채팅방 초대',
      description: `${nickname}님에게 채팅방 초대를 완료했습니다.`,
    });
  };

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
            <Popconfirm
              title={`${nickname}님을 채팅방에 초대하시겠습니까?`}
              onConfirm={() => inviteChatRoom({ nickname, targetId: userId })}>
              <Button type="primary">초대</Button>
            </Popconfirm>,
          ];
        }}
      />
    </Modal>
  );
};

export { InviteChatRoomForm };
