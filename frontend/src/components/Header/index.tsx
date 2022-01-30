import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Confirm } from '..';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { signoutAsync } from '../../store/auth/actions';

import style from './index.module.scss';

type HeaderProps = {
  friendListVisible: boolean;
  setFriendListVisible: (visible: boolean) => void;
};

const Header = ({ friendListVisible, setFriendListVisible }: HeaderProps) => {
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const auth = useAppSelector(state => state.auth);
  const { signin } = auth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickSignin = () => {
    navigate('/signin');
  };
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Chat App</h1>
      <Space className={style.wrap_btn}>
        {signin.data ? (
          <span className={style.username}>{signin.data.user.nickname} 님</span>
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
        <Button
          shape="circle"
          icon={<CloseCircleOutlined />}
          size="large"
          onClick={() => setConfirmVisible(true)}
          type="default"></Button>
        <Confirm
          onCancel={() => {
            setConfirmVisible(false);
          }}
          onSubmit={() => {
            dispatch(signoutAsync.request({}));
            setConfirmVisible(false);
          }}
          title="로그아웃"
          message="로그아웃 하시겠습니까?"
          isModalVisible={confirmVisible}
          withInput={false}
        />
      </Space>
    </div>
  );
};

export { Header };
