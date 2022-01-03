import React from 'react';
import { Button } from 'antd';
import { useAuthState } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';

const Header = () => {
  const { userId } = useAuthState();
  const navigate = useNavigate();
  const onClickSignin = () => {
    navigate('/signin');
  };
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <div className={style.wrap_btn}>
        {userId ? (
          <span className={style.username}>{userId} 님</span>
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
