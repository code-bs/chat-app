import React from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFriendAsync } from '../../store/user/actions';
import { SigninResponse } from '../../types';
import { UserSummaryList } from '..';

type ConfirmFriendRequestProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmFriendRequest = ({ isModalVisible, closeModal }: ConfirmFriendRequestProps) => {
  const {
    user: { userId },
  } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const dispatch = useAppDispatch();
  const addFriendRequest = (friendId: string) => {
    dispatch(addFriendAsync.request({ userId, friendId }));
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
