import React, { useState, ChangeEvent, useMemo } from 'react';
import { Modal, Input, List, Avatar, Button, Popconfirm, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findUserAsync } from '../../store/user/actions';
import { debounce } from '../../utils';
import { sendMessage } from '../../store/socket';
import { UserSummaryList } from '..';
import { SendFriendRequestParams } from '../../types';

type SendFriendRequestFromProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const SendFriendRequestFrom = ({ isModalVisible, closeModal }: SendFriendRequestFromProps) => {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();
  const { findUser } = useAppSelector(state => state.user);
  const { data } = findUser;
  const auth = useAppSelector(state => state.auth.signin.data);
  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(findUserAsync.request({ userId: value }));
        console.log(value);
      }, 300),
    [dispatch],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    debouncedDispatch(value);
  };

  const sendFriendRequest = ({ nickname, targetId }: { targetId: string; nickname: string }) => {
    sendMessage<SendFriendRequestParams>('friend', {
      targetId,
      userId: auth?.user.userId as string,
    });
    notification.open({
      message: '친구추가 요청',
      description: `${nickname}님에게 친구추가 요청을 완료했습니다.`,
    });
  };

  return (
    <Modal
      title="친구 추가"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}
      footer={null}>
      <Input placeholder="userId" allowClear onChange={onChange} value={input} />
      <UserSummaryList
        data={data}
        createActions={({ userId, nickname }) => {
          return [
            <Popconfirm
              title={`${nickname}님에게 친구요청을 보내시겠습니까?`}
              onConfirm={() => sendFriendRequest({ nickname, targetId: userId })}>
              <Button type="primary">친구추가</Button>
            </Popconfirm>,
          ];
        }}
      />
    </Modal>
  );
};

export { SendFriendRequestFrom };
