import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import PropTypes from 'prop-types'

//#9a77cf

const LoginForm = ({ onFinish, onFinishFailed }) => {
  return (
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
LoginForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
}

export default LoginForm
