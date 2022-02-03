import React from 'react';
import { Button, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Profile } from '..';

import style from './index.module.scss';

type HeaderProps = {
  friendListVisible: boolean;
  setFriendListVisible: (visible: boolean) => void;
};

const Header = ({ friendListVisible, setFriendListVisible }: HeaderProps) => {
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <Space className={style.wrap_btn}>
        <Profile />
        <Button
          shape="circle"
          icon={<MenuOutlined />}
          size="large"
          onClick={() => setFriendListVisible(!friendListVisible)}
          type={friendListVisible ? 'primary' : 'default'}
        />
      </Space>
    </div>
  );
};

export { Header };
