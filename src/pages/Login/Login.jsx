import React from 'react'
import './style.css'
import { Layout, Row, Col } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

import { login } from '../../services'

import LandingMenu from '../../modules/LandingMenu/LandingMenu'
import LoginForm from '../../modules/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const resultAction = await login(values)
    if (resultAction) navigate('/')
  }
  return (
    <Layout style={{ height: '100vh' }} className="LoginLayout">
      <LandingMenu />
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

export default Login
