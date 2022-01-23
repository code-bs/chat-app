import React from 'react';
import { Menu, Button } from 'antd';
import { Layout } from 'antd';

const { Sider } = Layout;
const FriendList = () => {
  return (
    <Sider theme="light">
      <Menu onClick={() => {}} mode="horizontal">
        친구목록
      </Menu>
    </Sider>
  );
};

export { FriendList };
