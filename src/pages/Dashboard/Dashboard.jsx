import React from 'react'
import './style.css'
import { Col, Layout, Row } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'
// import { Footer, Header } from 'antd/es/layout/layout'
// import Sider from 'antd/es/layout/Sider'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

export const Dashboard = () => {
  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
            <Col flex="640px">
              <div>Dashboard</div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
