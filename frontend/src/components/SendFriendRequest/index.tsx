import React, { useState, ChangeEvent, useMemo } from 'react';
import { Modal, Input, Button, Popconfirm, notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchUserAsync } from '../../store/user/actions';
import { debounce } from '../../utils';
import { sendMessage } from '../../store/socket';
import { UserSummaryList } from '..';
import { SendFriendRequestParams, SigninResponse } from '../../types';

type SendFriendRequestProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const SendFriendRequest = ({ isModalVisible, closeModal }: SendFriendRequestProps) => {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth.signin.data) as SigninResponse;
  const { userId } = user;
  const { searchUser } = useAppSelector(state => state.user);
  const friends = useAppSelector(state => state.user.friendList.data) || [];
  const exception = [userId, ...friends.map(user => user.userId)];

  const { data: searchResults } = searchUser;
  const data = (searchResults || []).filter(({ userId }) => !exception.some(id => id === userId));
  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(searchUserAsync.request({ userId: value }));
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
      sender: user,
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

export { SendFriendRequest };
