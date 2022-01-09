import React, { useState } from 'react';
import { ChatRoom, ChatList, FriendList, Header as HeaderComponet } from '../../components';
import { Layout } from 'antd';
import style from './index.module.scss';

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [friendListVisible, setFriendListVisible] = useState<boolean>(false);
  return (
    <Layout className={style.container}>
      <Layout className={style.container}>
        <Header className={style.header}>
          <HeaderComponet {...{ friendListVisible, setFriendListVisible }} />
        </Header>
        <Layout>
          <Sider>
            <ChatList />
          </Sider>
          <Content>
            <ChatRoom />
          </Content>
        </Layout>
      </Layout>
      {friendListVisible && <FriendList />}
    </Layout>
  );
};

export { Main };
