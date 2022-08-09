import React from 'react'
import './style.css'
import { Layout, Row, Col } from 'antd'
import { HeaderMenu } from '../../modules'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

export const Landing = () => {
  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }} className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row style={{ paddingTop: '150px' }} align="middle" justify="center">
          <Col flex="640px">
            <div>Landing</div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
