import React from 'react';
import { ChatRoom, ChatList } from './components';
import { ChatProvider } from './contexts';
import { Layout } from 'antd';
import './App.scss';

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <ChatProvider>
      <Layout className="App">
        <Header style={{ color: '#ffffff' }}>header</Header>
        <Layout>
          <Sider>
            <ChatList />
          </Sider>
          <Content>
            <ChatRoom />
          </Content>
        </Layout>
      </Layout>
    </ChatProvider>
  );
}

export default App;
