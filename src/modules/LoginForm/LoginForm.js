import React from 'react'
import { Button, Checkbox, Form, Input, Modal, notification } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios';

export const LoginForm = ({ onFinish, onFinishFailed }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const emailRef = React.useRef(null)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Context = React.createContext({
    name: 'Default',
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Success`,
      description: <Context.Consumer>{({ name }) => 'Message with instructions how to reset your password has been sent to your email'}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = React.useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  const handleSubmit= async() => {
    try {
      await axios.post('/reset-code',{email:emailRef.current.input.value})
      handleCancel()
      openNotification('bottomLeft')
    } catch(error) {
      console.log({error})

    }
  }
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item label="EMAIL" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="PASSWORD" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <span style={{
            cursor:"pointer"
          }}
          onClick={showModal}
          >
            Do not remember password? Click here
          </span>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal title="Insert email to receive reset password code" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item label="EMAIL" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input ref={emailRef}/>
        </Form.Item>
        <div style={{textAlign:"center"}}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
          </div>
      </Modal>
      <Context.Provider value={contextValue}>
      {contextHolder}
      {/* <Space>
        <Button type="primary" onClick={() => openNotification('bottomLeft')}>
          <RadiusUpleftOutlined />
          topLeft
        </Button>
      </Space> */}
      </Context.Provider>
    </>
  )
}
LoginForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
}
