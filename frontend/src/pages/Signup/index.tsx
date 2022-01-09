import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Divider, Button, Space, message } from 'antd';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import { useAuthDispatch, signup, useAuthState } from '../../contexts';
import style from './index.module.scss';

type FormValues = {
  userId: string;
  nickname: string;
  password: string;
  confirm: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { signupProcess } = useAuthState();
  const { error } = signupProcess;
  const onClickCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);
  const dispatch = useAuthDispatch();
  const onClickSubmit = async (values: FormValues) => {
    const { userId, password, nickname } = values;
    await signup(dispatch, { userId, password, nickname });
  };
  return (
    <Card className={style.container}>
      <p>회원 가입</p>
      <Divider />
      <Form name="signup" labelCol={{ span: 6 }} onFinish={onClickSubmit}>
        <Form.Item label="Id" name="userId" rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
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
          rules={[
            { required: true, message: '비밀번호 확인을 입력해주세요!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ offset: 8, span: 8 }} style={{ marginBottom: 0 }}>
          <Space align="center" direction="horizontal">
            <Button type="primary" htmlType="submit" size="large">
              가입완료
            </Button>
            <Button size="large" onClick={onClickCancel}>
              취소
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export { Signup };
