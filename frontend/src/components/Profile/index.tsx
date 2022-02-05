import React, { useState } from 'react';
import { Button, Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signoutAsync } from '../../store/auth/actions';
import { Confirm } from '..';
import style from './index.module.scss';
import { SigninResponse } from '../../types';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const { avatarUrl, nickname } = user;
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const content = (
    <div className={style.content}>
      <Button block className={style.button}>
        프로필 변경
      </Button>
      <Button block className={style.button} onClick={() => setConfirmVisible(true)}>
        로그아웃
      </Button>
    </div>
  );
  return (
    <>
      <span className={style.username}>{nickname}님</span>
      <Popover
        placement="bottom"
        content={content}
        style={{ padding: 0 }}
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={setPopoverVisible}
        className={style.container}>
        <Avatar
          shape="circle"
          size="large"
          className={style.avatar}
          {...(avatarUrl ? { src: avatarUrl } : { icon: <UserOutlined /> })}
        />
      </Popover>
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
    </>
  );
};

export { Profile };
