import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../types';

type UserSummaryListProps = {
  createActions?: (user: User) => React.ReactNode[] | undefined;
  data: User[] | null;
};

const UserSummaryList = ({ createActions, data }: UserSummaryListProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data || []}
      style={{ padding: '16px 24px' }}
      renderItem={({ userId, avatarUrl, nickname, statusMessage }) => (
        <List.Item actions={createActions && createActions({ userId, avatarUrl, nickname, statusMessage })}>
          <List.Item.Meta
            avatar={avatarUrl ? <Avatar src={avatarUrl} /> : <UserOutlined />}
            title={`[${userId}]${nickname}`}
            description={<p>{statusMessage}</p>}
          />
        </List.Item>
      )}
    />
  );
};

export { UserSummaryList };
