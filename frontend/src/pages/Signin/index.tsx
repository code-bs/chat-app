import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Divider, Button, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthDispatch, signin, useAuthState } from '../../contexts';
import style from './index.module.scss';

type FormValues = {
  userId: string;
  password: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const { auth } = useAuthState();
  const { error } = auth;
  useEffect(() => {
    if (error) {
      message.error(error).then();
    }
  }, [error]);
  const onClickSignup = () => {
    navigate('/signup');
  };
  const dispatch = useAuthDispatch();
  const onClickSubmit = async (values: FormValues) => {
    const { userId, password } = values;
    await signin(dispatch, { userId, password });
  };
  return (
    <Card className={style.container}>
      <p>Welcome To Chat App</p>
      <Divider />
      <Form name="login" labelCol={{ span: 4 }} onFinish={onClickSubmit}>
        <Form.Item label="Id" name="userId" rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
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
            <Button size="large" onClick={onClickSignup}>
              회원가입
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export { Signin };
