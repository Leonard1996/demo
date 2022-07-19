import React from 'react'
import './style.css'
import { Layout, Row, Col } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

import LandingMenu from '../../modules/LandingMenu/LandingMenu'
import LoginForm from '../../modules/Form/Form'

const Login = () => {
  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }} className="LoginLayout">
      <LandingMenu />
      <Content>
        <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
          <Col flex="640px">
            {/*<Card*/}
            {/*  title="Login"*/}
            {/*  style={{ width: 360 }}*/}
            {/*  headStyle={{*/}
            {/*    background: '#F0F2F5',*/}
            {/*    color: '#36A7AA',*/}
            {/*    fontSize: '24px',*/}
            {/*    // lineHeight: '32px',*/}
            {/*    padding: '0px',*/}
            {/*  }}*/}
            {/*  // bodyStyle={{ padding: '24px 0' }}*/}
            {/*  bordered={false}*/}
            {/*/>*/}
            <LoginForm />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Login
