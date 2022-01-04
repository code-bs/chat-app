import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

type CenteredProps = {
  children: ReactNode;
};

const Centered = ({ children }: CenteredProps) => {
  return (
    <Row
      justify="space-around"
      align="middle"
      style={{
        height: '100%',
      }}>
      <Col>{children}</Col>
    </Row>
  );
};

export { Centered };
