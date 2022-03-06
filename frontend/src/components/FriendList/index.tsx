import React, { useState } from 'react';
import { PageHeader, Button, Layout } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import { SendFriendRequest, UserSummaryList } from '..';

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
            key="closeModal"
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
      <SendFriendRequest {...{ isModalVisible, closeModal }} />
    </Sider>
  );
};

export { FriendList };
