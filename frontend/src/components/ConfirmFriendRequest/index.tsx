import React from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFriendAsync } from '../../store/user/actions';
import { UserSummaryList } from '..';

type ConfirmFriendRequestProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmFriendRequest = ({ isModalVisible, closeModal }: ConfirmFriendRequestProps) => {
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const dispatch = useAppDispatch();
  const addFriendRequest = (senderId: string) => {
    dispatch(addFriendAsync.request({ senderId }));
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
            <Button type="primary" onClick={() => addFriendRequest(userId)}>
              수락
            </Button>,
            <Button type="primary" danger>
              거절
            </Button>,
          ];
        }}
      />
    </Modal>
  );
};

export { ConfirmFriendRequest };
