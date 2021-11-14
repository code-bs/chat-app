import React, { useState } from 'react';
import { Modal, Input } from 'antd';

type ConfirmProps = {
  title: string;
  message: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  withInput: boolean;
  isModalVisible: boolean;
};

const Confirm = ({ title, message, onSubmit, onCancel, withInput, isModalVisible }: ConfirmProps) => {
  const [input, setInput] = useState<string>('');
  const clearInput = () => {
    setInput('');
  };
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={() => {
        onSubmit(input);
        clearInput();
      }}
      onCancel={() => {
        onCancel();
        clearInput();
      }}>
      <p>{message}</p>
      {withInput && <Input onChange={e => setInput(e.target.value)} value={input} />}
    </Modal>
  );
};

export { Confirm };
