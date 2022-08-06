import React from 'react'
import './style.css'
import { Layout, Row, Col, message } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

import { login } from '../../services'

import { useNavigate } from 'react-router-dom'
import { HeaderMenu, LoginForm } from '../../modules'

export const Login = () => {
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const { error, msg } = await login(values)
    if (!error) {
      return navigate('/')
    }
    message.error(msg)
  }
  return (
    <Layout style={{ height: '100vh' }} className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
          <Col flex="640px">
            <LoginForm onFinish={onFinish} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
