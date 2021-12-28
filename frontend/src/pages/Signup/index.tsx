import React from 'react';
import { Card, Form, Input, Divider, Button, Space } from 'antd';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import style from './index.module.scss';
const Signup = () => {
  return (
    <Card className={style.container}>
      <p>회원 가입</p>
      <Divider />
      <Form name="signup" labelCol={{ span: 6 }}>
        <Form.Item label="Id" name="id" rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Nickname" name="nickname" rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}>
          <Input prefix={<SmileOutlined />} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          rules={[{ required: true, message: '비밀번호 확인을 입력해주세요!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ offset: 8, span: 8 }} style={{ marginBottom: 0 }}>
          <Space align="center" direction="horizontal">
            <Button type="primary" htmlType="submit" size="large">
              가입완료
            </Button>
            <Button size="large">취소</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export { Signup };
