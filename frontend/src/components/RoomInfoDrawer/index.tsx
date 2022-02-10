import React from 'react';
import { Drawer, Button, Space, Divider, Layout } from 'antd';
import style from './index.module.scss';

const { Content, Footer } = Layout;

type RoomInfoDrawerProps = {
  roomInfoVisible: boolean;
  closeRoomInfo: () => void;
};

const RoomInfoDrawer = ({ roomInfoVisible, closeRoomInfo }: RoomInfoDrawerProps) => {
  return (
    <Drawer visible={roomInfoVisible} onClose={closeRoomInfo} title="방 정보">
      <Layout className={style.container}>
        <Content>
          <h3>참여자</h3>
          <Divider />
        </Content>
        <Footer className={style.footer}>
          <Button block type="primary">
            친구 초대
          </Button>
          <Button block type="primary" danger>
            방 나가기
          </Button>
        </Footer>
      </Layout>
    </Drawer>
  );
};
export { RoomInfoDrawer };
