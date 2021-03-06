import React, { useState, useEffect } from 'react';
import { ChatRoom, ChatList, FriendList, Header as HeaderComponet } from '../../components';
import { Layout, Empty } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Centered } from '../../layouts';
import style from './index.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { getChatRoomListAsync, getRoomInviteAsync } from '../../store/chat/actions';
import { getFriendListAsync, getFriendRequestAsync } from '../../store/user/actions';

const { Header, Sider, Content } = Layout;

const Chat = () => {
  const [friendListVisible, setFriendListVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const closeFriendList = () => {
    setFriendListVisible(false);
  };

  useEffect(() => {
    dispatch(getChatRoomListAsync.request());
    dispatch(getFriendListAsync.request());
    dispatch(getFriendRequestAsync.request());
    dispatch(getRoomInviteAsync.request());
  }, [dispatch]);

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
      {friendListVisible && <FriendList closeFriendList={closeFriendList} />}
    </Layout>
  );
};

export { Chat };
