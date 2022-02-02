import React, { useState, ChangeEvent, useMemo } from 'react';
import { Modal, Input, List, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findUserAsync } from '../../store/user/actions';
import { debounce } from '../../utils';

type AddFriendFormProps = {
  isModalVisible: boolean;
  closeModal: () => void;
};

const AddFriendForm = ({ isModalVisible, closeModal }: AddFriendFormProps) => {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();
  const { findUser } = useAppSelector(state => state.user);
  const { data, status } = findUser;
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
  return (
    <Modal
      title="친구 추가"
      visible={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        closeModal();
      }}>
      <Input placeholder="userId" allowClear onChange={onChange} value={input} />
      <List
        itemLayout="horizontal"
        dataSource={data || []}
        renderItem={({ userId, avatarUrl, nickname, statusMessage }) => (
          <List.Item actions={[<Button>친구추가</Button>]}>
            <List.Item.Meta
              avatar={avatarUrl ? <Avatar src={avatarUrl} /> : <UserOutlined />}
              title={`[${userId}]${nickname}`}
              description={<p>{statusMessage}</p>}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export { AddFriendForm };
