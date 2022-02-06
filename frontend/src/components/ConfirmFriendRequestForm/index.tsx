import React from 'react';
import { Modal, List, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GetFriendRequestResponse } from '../../types';

type ConfirmFriendRequestFormProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  friendRequest: GetFriendRequestResponse | null;
};

const ConfirmFriendRequestForm = ({ isModalVisible, closeModal, friendRequest }: ConfirmFriendRequestFormProps) => {
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
              <Button type="primary">수락</Button>,
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
