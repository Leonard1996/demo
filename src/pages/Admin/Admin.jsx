import React from 'react'
import './style.css'
import { Col, Layout, Row } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'

export const Admin = () => {
  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Row style={{ paddingTop: '150px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">Admin</Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
