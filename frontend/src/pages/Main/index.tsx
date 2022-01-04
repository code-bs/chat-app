import React from 'react';
import { ChatRoom, ChatList, Header as HeaderComponet } from '../../components';
import { Layout } from 'antd';
import style from './index.module.scss';

const { Header, Sider, Content } = Layout;

const Main = () => {
  return (
    <Layout className={style.container}>
      <Header className={style.header}>
        <HeaderComponet />
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
  );
};

export { Main };
