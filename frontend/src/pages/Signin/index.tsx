import React from 'react';
import { Card, Form, Input, Divider, Button, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './index.module.scss';

const Signin = () => {
  return (
    <Card className={style.container}>
      <p>Welcome To Chat App</p>
      <Divider />
      <Form name="login" labelCol={{ span: 4 }}>
        <Form.Item label="Id" name="id" rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ offset: 8, span: 8 }} style={{ marginBottom: 0 }}>
          <Space align="center" direction="horizontal">
            <Button type="primary" htmlType="submit" size="large">
              로그인
            </Button>
            <Button size="large">회원가입</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export { Signin };
