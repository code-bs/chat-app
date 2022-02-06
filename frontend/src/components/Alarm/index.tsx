import React, { useState } from 'react';
import { Badge, Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { ConfirmFriendRequestForm } from '..';
import style from './index.module.scss';

const Alarm = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const contents = (
    <div>
      {friendRequest && friendRequest.length > 0 && (
        <Button className={style.button} onClick={() => setModalVisible(true)}>
          {friendRequest.length}개의 친구요청이 있습니다.
        </Button>
      )}
    </div>
  );
  console.log(isModalVisible);
  return (
    <>
      <Popover placement="bottom" content={contents}>
        <Badge dot size="small">
          <Button icon={<BellOutlined />} size="large" shape="circle" />
        </Badge>
      </Popover>
      <ConfirmFriendRequestForm {...{ isModalVisible, closeModal, friendRequest }} />
    </>
  );
};

export { Alarm };
