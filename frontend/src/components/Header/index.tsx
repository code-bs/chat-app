import React from 'react';
import { Button } from 'antd';
import { useAuthState, useAuthDispatch, signIn } from '../../contexts';
import style from './index.module.scss';

const Header = () => {
  const { userId } = useAuthState();
  const authDispatch = useAuthDispatch();
  const onClickSignin = () => {
    const id = prompt('아이디를 입력하세요');
    signIn(authDispatch, id as string);
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
