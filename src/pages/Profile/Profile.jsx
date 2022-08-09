import { Col, Divider, Layout, Row, Space, Tooltip } from 'antd'
import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { getUser } from '../../shared/utils'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'

import './style.css'
import { EditOutlined } from '@ant-design/icons'

export const Profile = () => {
  const {
    name,
    lastName,
    birthday,
    email,
    patient: {
      newsletter,
      details: { phone },
    },
  } = getUser() || {}
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row className="profile" style={{ paddingTop: '55px', paddingLeft: '300px' }}>
            <Col style={{ textAlign: 'start' }}>
              <Space size={10} direction="vertical">
                <div className="name">
                  {name} {lastName}
                </div>
                <div className="birthday">Data di nascita {moment(birthday).format('l')}</div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="payment-details">
                  <div>
                    Dati di fatturazione
                    <Tooltip title="Edit MyOrders">
                      <EditOutlined />
                    </Tooltip>
                  </div>
                  <div>Address</div>
                  <div>ZIP</div>
                  <div>City</div>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="email">
                  Email: {email}
                  <Tooltip title="Edit MyOrders">
                    <EditOutlined />
                  </Tooltip>
                </div>
                <div className="phone">Tel: {phone}</div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="newsletter">
                  Newsletter: {newsletter ? 'SI' : 'NO'}
                  <Tooltip title="Edit MyOrders">
                    <EditOutlined />
                  </Tooltip>
                </div>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
