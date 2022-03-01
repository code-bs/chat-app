import React from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { acceptFriendRequestAsync, denyFriendRequestAsync } from '../../store/user/actions';
import { UserSummaryList } from '..';

type ConfirmFriendRequestProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmFriendRequest = ({ isModalVisible, closeModal }: ConfirmFriendRequestProps) => {
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const dispatch = useAppDispatch();
  const acceptFriendRequest = (senderId: string) => {
    dispatch(acceptFriendRequestAsync.request({ senderId }));
  };
  const denyFriendRequest = (senderId: string) => {
    dispatch(denyFriendRequestAsync.request({ senderId }));
  };
  return (
    <Modal
      title="친구 요청"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}
      footer={null}>
      <UserSummaryList
        data={friendRequest}
        createActions={({ userId }) => {
          return [
            <Button type="primary" onClick={() => acceptFriendRequest(userId)}>
              수락
            </Button>,
            <Button type="primary" danger onClick={() => denyFriendRequest(userId)}>
              거절
            </Button>,
          ];
        }}
      />
    </Modal>
  );
};

export { ConfirmFriendRequest };
