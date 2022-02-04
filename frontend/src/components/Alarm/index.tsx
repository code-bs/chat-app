import React from 'react';
import { Badge, Button, Popover, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';

const Alarm = () => {
  const friendRequest = useAppSelector(state => state.user.friendRequest.data);
  const contents = (
    <div>
      {friendRequest && friendRequest.length > 0 && <div>{friendRequest.length}개의 친구요청이 있습니다.</div>}
      <div>더보기</div>
    </div>
  );
  return (
    <Popover placement="bottom" content={contents}>
      <Badge dot size="small">
        <Button icon={<BellOutlined />} size="large" shape="circle" />
      </Badge>
    </Popover>
  );
};

export { Alarm };
