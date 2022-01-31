import React from 'react';
import { PageHeader, Button } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Sider } = Layout;

type FriendListProps = {
  closeFriendList: () => void;
};
const FriendList = ({ closeFriendList }: FriendListProps) => {
  return (
    <Sider theme="light">
      <PageHeader
        backIcon={<CloseOutlined />}
        onBack={() => {
          closeFriendList();
        }}
        title="친구"
        extra={[<Button shape="circle" icon={<UserAddOutlined />} size="large" onClick={() => {}}></Button>]}
      />
    </Sider>
  );
};

export { FriendList };
