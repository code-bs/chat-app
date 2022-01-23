import React, { useState } from 'react';
import { ChatRoom, ChatList, FriendList, Header as HeaderComponet } from '../../components';
import { Layout, Empty } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Centered } from '../../layouts';
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
            <Routes>
              <Route path=":roomId" element={<ChatRoom />} />
              <Route
                index
                element={
                  <Centered>
                    <Empty description={'Please select chat room!'} />
                  </Centered>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      {friendListVisible && <FriendList />}
    </Layout>
  );
};

export { Main };
