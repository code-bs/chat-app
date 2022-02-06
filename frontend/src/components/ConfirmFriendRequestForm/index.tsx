import React from 'react';
import { Modal, List, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFriendAsync } from '../../store/user/actions';
import { GetFriendRequestResponse, SigninResponse } from '../../types';

type ConfirmFriendRequestFormProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  friendRequest: GetFriendRequestResponse | null;
};

const ConfirmFriendRequestForm = ({ isModalVisible, closeModal, friendRequest }: ConfirmFriendRequestFormProps) => {
  const {
    user: { userId },
  } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
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
      <List
        itemLayout="horizontal"
        dataSource={friendRequest || []}
        renderItem={({ userId, avatarUrl, nickname, statusMessage }) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => addFriendRequest(userId)}>
                수락
              </Button>,
              <Button type="primary" danger>
                거절
              </Button>,
            ]}>
            <List.Item.Meta
              avatar={avatarUrl ? <Avatar src={avatarUrl} /> : <UserOutlined />}
              title={`[${userId}]${nickname}`}
              description={<p>{statusMessage}</p>}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export { ConfirmFriendRequestForm };
