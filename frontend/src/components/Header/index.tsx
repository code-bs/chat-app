import React from 'react';
import { Button } from 'antd';
import style from './index.module.scss';

const Header = () => {
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <div className={style.wrap_btn}>
        <Button type="primary">Sign in</Button>
      </div>
    </div>
  );
};

export { Header };
