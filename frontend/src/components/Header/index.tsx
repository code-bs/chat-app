import React from 'react';
import { Button } from 'antd';
import { useAuthState } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';

const Header = () => {
  const { auth } = useAuthState();
  const navigate = useNavigate();
  const onClickSignin = () => {
    navigate('/signin');
  };
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <div className={style.wrap_btn}>
        {auth.data ? (
          <span className={style.username}>{auth.data.user.nickname} 님</span>
        ) : (
          <Button type="primary" onClick={onClickSignin}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
};

export { Header };
