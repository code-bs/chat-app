import React, { useState } from 'react';
import { Badge, Button, Popover } from 'antd';
import { BellOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { ConfirmFriendRequestForm } from '..';
import style from './index.module.scss';

const Alarm = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const roomInvite = useAppSelector(state => state.chat.roomInvite.data);
  const existFriendRequest = !!friendRequest && friendRequest.length > 0;
  const existRoomInvite = !!roomInvite && roomInvite.length > 0;
  const contents = (
    <div className={style.content}>
      {existFriendRequest && (
        <Button className={style.button} onClick={() => setModalVisible(true)} block>
          {friendRequest.length}개의 친구요청이 있습니다.
        </Button>
      )}
      {existRoomInvite && (
        <Button className={style.button} onClick={() => setModalVisible(true)} block>
          {roomInvite.length}개의 초대가 있습니다.
        </Button>
      )}
      <Button className={style.button} icon={<EllipsisOutlined />} block />
    </div>
  );
  return (
    <div>
      <Popover
        placement="bottom"
        content={contents}
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={setPopoverVisible}>
        <Badge dot={existFriendRequest} size="small">
          <Button icon={<BellOutlined />} size="large" shape="circle" />
        </Badge>
      </Popover>
      <ConfirmFriendRequestForm {...{ isModalVisible, closeModal, friendRequest }} />
    </div>
  );
};

export { Alarm };
