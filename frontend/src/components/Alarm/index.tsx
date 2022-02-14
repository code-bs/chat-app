import React, { useState } from 'react';
import { Badge, Button, Popover } from 'antd';
import { BellOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { ConfirmFriendRequest, ConfirmRoomInvite } from '..';
import style from './index.module.scss';

enum MODAL_STATUS {
  none,
  friendRequest,
  roomInvite,
}

const Alarm = () => {
  const [modalStatus, setModalStatus] = useState<MODAL_STATUS>(MODAL_STATUS.none);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const closeModal = () => {
    setModalStatus(MODAL_STATUS.none);
  };
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const roomInvite = useAppSelector(state => state.chat.roomInvite.data);
  const existFriendRequest = !!friendRequest && friendRequest.length > 0;
  const existRoomInvite = !!roomInvite && roomInvite.length > 0;
  const contents = (
    <div className={style.content}>
      {existFriendRequest && (
        <Button className={style.button} onClick={() => setModalStatus(MODAL_STATUS.friendRequest)} block>
          {friendRequest.length}개의 친구요청이 있습니다.
        </Button>
      )}
      {existRoomInvite && (
        <Button className={style.button} onClick={() => setModalStatus(MODAL_STATUS.roomInvite)} block>
          {roomInvite.length}개의 채팅방 초대가 있습니다.
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
        <Badge dot={existFriendRequest || existRoomInvite} size="small">
          <Button icon={<BellOutlined />} size="large" shape="circle" />
        </Badge>
      </Popover>
      <ConfirmFriendRequest
        {...{ isModalVisible: modalStatus === MODAL_STATUS.friendRequest, closeModal, friendRequest }}
      />
      <ConfirmRoomInvite isModalVisible={modalStatus === MODAL_STATUS.roomInvite} closeModal={closeModal} />
    </div>
  );
};

export { Alarm };
