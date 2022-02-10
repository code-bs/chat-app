import React, { useState } from 'react';
import { PageHeader, Button, Layout } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { SendFriendRequestFrom, UserSummaryList } from '..';

const { Sider } = Layout;

type FriendListProps = {
  closeFriendList: () => void;
};
const FriendList = ({ closeFriendList }: FriendListProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { data } = useAppSelector(state => state.user.friendList);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Sider theme="light">
      <PageHeader
        backIcon={<CloseOutlined />}
        onBack={() => {
          closeFriendList();
        }}
        title="친구"
        extra={[
          <Button
            shape="circle"
            icon={<UserAddOutlined />}
            size="large"
            onClick={() => {
              setModalVisible(true);
            }}
          />,
        ]}
      />
      <UserSummaryList data={data} />
      <SendFriendRequestFrom {...{ isModalVisible, closeModal }} />
    </Sider>
  );
};

export { FriendList };
