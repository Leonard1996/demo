import React from 'react'
import './styles.css'
import { Layout, Row, Col, Form, Input, Button, Checkbox, Card, Space } from 'antd';
import {  UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons';

import Logo from '../../assets/icons/Logo';
import CopyRight from '../../shared/components/CopyRight/CopyRight';
import Title from '../../shared/components/Title';

const Login = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout className='LoginLayout'>
    <Header className='LoginHeader'>
        <Logo width='244' height='80' />
        <Title name='KORPORATA ELEKTROENERGJITIKE SHQIPTARE' fs={14} capital={true} fw={'400'} maxWidth='100%' lh='0px'/>
        </Header>
    <Content>
    <Row align='middle' justify='center' >
      <Col flex="360px" >
        <Space  style={{paddingTop: '50px'}}>
        <Title name='Sistemi i Menaxhimit të Protokollit dhe Arkivës të KESH' fs={14} capital={false} fw={'400'} lh='50px' />
        </Space>
      <Card title="Login" style={{ width: 360 }} headStyle={{background: '#F0F2F5', color: '#36A7AA',fontSize: '24px', lineHeight: '32px',padding: '0px' }} bodyStyle={{padding: '24px 0'}} bordered={false}>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      size='middle'
      onFinish={''}
      
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        
      >
      
        <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item >
        <Space style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Form.Item name="remember" valuePropName="checked" noStyle >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href=" ">
          Forgot your password? {' '}
          <Button size='small' shape="circle" type='link' style={{boxShadow:' 0px 2px 8px rgba(0, 0, 0, 0.15)'}}><QuestionOutlined style={{color: 'black'}} /></Button>

        </a>
        </Space>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block size='large'>
          Log in
        </Button>
       
      </Form.Item>
    </Form>
    </Card>
      </Col>
    </Row>
    </Content>
    <Footer className='LoginFooter' >   <CopyRight /></Footer>
  </Layout>
  
 
  )
}

export default Login