import { Col, Divider, Layout, Row, Space } from 'antd'
import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'

export const MyOrders = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row className="profile" style={{ paddingTop: '55px', paddingLeft: '300px' }}>
            <Col style={{ textAlign: 'start' }}>
              <Space size={10} direction="vertical">
                <span>Fattura 23 del 16 marzo 2022 [visualizza] [scarica PDF]</span>
                <Divider style={{ margin: '10px 0' }} />
                <span>Fattura 15 del 26 marzo 2022 [visualizza] [scarica PDF]</span>
                <Divider style={{ margin: '10px 0' }} />
                <span>Fattura 19 del 28 marzo 2022 [visualizza] [scarica PDF]</span>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
