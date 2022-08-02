import React from 'react'
import './style.css'
import { Layout, Row, Col } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'
import { register } from '../../services'
import { useNavigate } from 'react-router-dom'
import { HeaderMenu, RegisterForm } from '../../modules'

const IntroText = () => {
  return (
    <div className="intro">
      <div className="intro-head">Compila il questionario</div>
      <div className="intro-sub">Poche e semplici domande, per raccontarci qualcosa di te</div>
    </div>
  )
}

export const Register = () => {
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const resultAction = await register(values)
    if (resultAction) navigate('/')
  }
  return (
    <Layout className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row align="middle" justify="start">
          <Col style={{ textAlign: 'start' }} span={24}>
            <IntroText />
          </Col>
        </Row>
        <Row style={{ padding: '50px 200px', background: '#fff' }} align="middle" justify="center">
          <Col flex="740px" style={{ textAlign: 'start' }} span={24}>
            <RegisterForm onFinish={onFinish} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Register
