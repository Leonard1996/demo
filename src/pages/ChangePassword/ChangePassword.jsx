import React from 'react'
import './style.css'
import { Layout, Row, Col } from 'antd'
import { login } from '../../services'

import { useNavigate } from 'react-router-dom'
import { ChangePasswordForm, HeaderMenu, SideMenu } from '../../modules'

import './style.css'

export const ChangePassword = () => {
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const resultAction = await login(values)
    if (resultAction) navigate('/')
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row className="changePassword" style={{ paddingTop: '150px' }} align="middle" justify="center">
            <Col flex="640px">
              <ChangePasswordForm onFinish={onFinish} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
