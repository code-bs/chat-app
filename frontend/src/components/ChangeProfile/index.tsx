import React, { useState } from 'react';
import { Modal, Button, Input, Avatar } from 'antd';
import { useAppSelector } from '../../store/hooks';
import { SigninResponse, User } from '../../types';
import { UserOutlined, SmileOutlined, CommentOutlined, PictureOutlined } from '@ant-design/icons';
import style from './index.module.scss';

type ChangeProfileProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const ChangeProfile = ({ isModalVisible, closeModal }: ChangeProfileProps) => {
  const { user } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const [userInfo, setUserInfo] = useState<User>(user);
  const changeUserInfo = (key: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  const { userId, nickname, avatarUrl, statusMessage } = userInfo;
  const [imgSrc, setImgSrc] = useState<string>(avatarUrl);
  return (
    <Modal
      title="회원정보 수정"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}>
      <label className={style.label}>
        아이디
        <Input prefix={<UserOutlined />} value={userId} disabled id="id" onChange={changeUserInfo('userId')} />
      </label>
      <label className={style.label}>
        닉네임
        <Input prefix={<SmileOutlined />} value={nickname} onChange={changeUserInfo('nickname')} />
      </label>
      <label className={style.label}>
        상태메시지
        <Input
          prefix={<CommentOutlined />}
          showCount
          maxLength={50}
          value={statusMessage}
          onChange={changeUserInfo('statusMessage')}
        />
      </label>
      <label className={style.label}>
        프로필 사진
        <Input.Group compact>
          <Input
            prefix={<PictureOutlined />}
            value={avatarUrl}
            onChange={changeUserInfo('avatarUrl')}
            style={{ width: 'calc(100% - 50px)' }}
          />
          <Button type="primary" style={{ width: '50px' }} onClick={() => setImgSrc(avatarUrl)}>
            적용
          </Button>
        </Input.Group>
      </label>
      <div style={{ backgroundColor: 'rgb(204, 204, 204)', textAlign: 'center', padding: '10px 0' }}>
        <Avatar
          shape="circle"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          className={style.avatar}
          {...(imgSrc ? { src: imgSrc } : { icon: <UserOutlined /> })}
          style={{ backgroundColor: '#fff' }}
        />
      </div>
    </Modal>
  );
};

export { ChangeProfile };
