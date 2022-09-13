import React from 'react'
import './style.css'
import { Col, Layout, Row, Table } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Type of Session',
    dataIndex: 'typeOfSession',
    width: 20,
    sorter: (a, b) => a.typeOfSession.localeCompare(b.typeOfSession),
  },
  {
    title: 'Type of Product',
    dataIndex: 'typeOfProduct',
    width: 20,
    sorter: (a, b) => a.typeOfProduct.localeCompare(b.typeOfProduct),
  },
  {
    title: 'Nr. of Sessions',
    dataIndex: 'numberOfSessions',
    width: 20,
    sorter: (a, b) => a.numberOfSessions - b.numberOfSessions,
  },
  {
    title: 'Validity from',
    dataIndex: 'from',
    sorter: (a, b) => a.from - b.from,
    render: text => <>{moment(text).format('L')}</>,
  },
  {
    title: 'Validity to',
    dataIndex: 'until',
    sorter: (a, b) => a.until - b.until,
    render: text => <>{moment(text).format('L')}</>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Taxes',
    dataIndex: 'taxes',
    width: 20,
    sorter: (a, b) => a.taxes - b.taxes,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 2,
    sorter: (a, b) => a.status - b.status,
  },
]
const data = [
  {
    key: '1',
    name: 'Gsessione',
    typeOfSession: 'single',
    typeOfProduct: 'standard',
    numberOfSessions: 1,
    from: Date.now(),
    until: Date.now(),
    price: '50 EUR',
    taxes: '0%',
    status: 1,
  },
  {
    key: '2',
    name: 'Asessione copia',
    typeOfSession: 'couple',
    typeOfProduct: 'standard',
    numberOfSessions: 1,
    from: Date.now(),
    until: Date.now(),
    price: '60 EUR',
    taxes: '0%',
    status: 1,
  },
  {
    key: '3',
    name: 'Pacheto 5 sesioni',
    typeOfSession: 'single',
    typeOfProduct: 'gift card',
    numberOfSessions: 5,
    from: Date.now(),
    until: Date.now(),
    price: '260 EUR',
    taxes: '0%',
    status: 1,
  },
]

export const Products = () => {
  const { Content } = Layout
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Row style={{ paddingTop: '50px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={data} onChange={onChange} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
