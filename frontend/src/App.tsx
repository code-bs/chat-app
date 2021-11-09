import React from 'react';
import { ChatRoom, ChatList, Header as HeaderComponet } from './components';
import { ChatProvider, AuthProvider } from './contexts';
import { Layout } from 'antd';
import './App.scss';

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Layout className="App">
          <Header style={{ color: '#ffffff' }}>
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
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
