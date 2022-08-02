import { Col, Layout, Row } from 'antd'
import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { getUser } from '../../shared/utils'
import { HeaderMenu, SideMenu } from '../../modules'

export const Profile = () => {
  const { name, lastName } = getUser() || {}
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
            <Col flex="640px">
              {name} {lastName}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
