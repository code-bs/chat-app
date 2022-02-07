import React, { useState } from 'react';
import { PageHeader, Button } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { SendFriendRequestFrom } from '..';
import { Layout } from 'antd';

const { Sider } = Layout;

type FriendListProps = {
  closeFriendList: () => void;
};
const FriendList = ({ closeFriendList }: FriendListProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Sider theme="light">
      <PageHeader
        backIcon={<CloseOutlined />}
        onBack={() => {
          closeFriendList();
        }}
        title="친구"
        extra={[
          <Button
            shape="circle"
            icon={<UserAddOutlined />}
            size="large"
            onClick={() => {
              setModalVisible(true);
            }}
          />,
        ]}
      />
      <SendFriendRequestFrom {...{ isModalVisible, closeModal }} />
    </Sider>
  );
};

export { FriendList };
