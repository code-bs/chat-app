import React from 'react';
import { Button, Space } from 'antd';
import { useAuthState } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

import style from './index.module.scss';

type HeaderProps = {
  friendListVisible: boolean;
  setFriendListVisible: (visible: boolean) => void;
};

const Header = ({ friendListVisible, setFriendListVisible }: HeaderProps) => {
  const { auth } = useAuthState();
  const navigate = useNavigate();
  const onClickSignin = () => {
    navigate('/signin');
  };
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <Space className={style.wrap_btn}>
        {auth.data ? (
          <span className={style.username}>{auth.data.user.nickname} 님</span>
        ) : (
          <Button type="primary" onClick={onClickSignin}>
            Sign in
          </Button>
        )}
        <Button
          shape="circle"
          icon={<UserOutlined />}
          size="large"
          onClick={() => setFriendListVisible(!friendListVisible)}
          type={friendListVisible ? 'primary' : 'default'}
        />
      </Space>
    </div>
  );
};

export { Header };
