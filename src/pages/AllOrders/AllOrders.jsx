import React, { useEffect, useState } from 'react'
import './style.css'
// eslint-disable-next-line no-unused-vars
import { Badge, Button, Col, DatePicker, Form, Input, Layout, message, Modal, Radio, Row, Space, Table } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'
import { getAllOrders } from '../../services'

export const AllOrders = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Data',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.from - b.from,
      render: text => <>{moment(text).format('L')}</>,
    },
    {
      title: 'Prezzo',
      dataIndex: 'paid',
      width: 20,
      sorter: (a, b) => a.paid - b.paid,
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      width: 20,
      sorter: (a, b) => a.fee - b.fee,
    },
    {
      title: 'Tipo',
      dataIndex: 'sessionType',
    },
  ]
  const { Content } = Layout
  const [orders, setOrders] = useState([])
  useEffect(() => {
    getAllOrders().then(d => setOrders(d))
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Row style={{ paddingTop: '50px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <h2>Vendite</h2>
            </Col>
          </Row>
          {/*<Row style={{ paddingLeft: '100px', textAlign: 'end' }} align="middle">*/}
          {/*  <Col flex="auto">*/}
          {/*    <Button onClick={() => setCreateModal(true)} type="primary">*/}
          {/*      Create Promo Codes*/}
          {/*    </Button>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={orders} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
