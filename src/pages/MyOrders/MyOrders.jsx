import { Button, Col, Divider, Layout, Modal, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'
import { getOrders } from '../../services'
import moment from 'moment'
import PropTypes from 'prop-types'

export const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [detailsModal, setDetailsModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState()
  useEffect(() => {
    getOrders().then(d => setOrders(d))
  }, [])
  const openDetailsModal = order => {
    setSelectedOrder(order)
    setDetailsModal(true)
  }
  const ordersDisplay =
    orders.length > 0 ? (
      orders.map(order => {
        return (
          <>
            <span>
              Fattura {order.id} del {moment(order.createdAt).format('LLL')}{' '}
              <span onClick={() => openDetailsModal(order)}>[visualizza]</span>
            </span>
            <Divider style={{ margin: '10px 0' }} />
          </>
        )
      })
    ) : (
      <>
        <span>Nessun ordine trovato</span>
        <Divider style={{ margin: '10px 0' }} />
      </>
    )
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <DetailsModal
            details={selectedOrder}
            detailsModal={detailsModal}
            detailsModalClose={() => setDetailsModal(false)}
          />
          <Row className="profile" style={{ paddingTop: '55px', paddingLeft: '300px' }}>
            <Col style={{ textAlign: 'start' }}>
              <Space size={10} direction="vertical">
                {ordersDisplay}
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

const DetailsModal = ({ detailsModal, detailsModalClose, details = {} }) => {
  return (
    <Modal
      // width={1200}
      footer={[
        <Button key="back" onClick={detailsModalClose}>
          Cancel
        </Button>,
      ]}
      title="Details"
      visible={detailsModal}
      onCancel={detailsModalClose}
    >
      <Row flex="auto" className="profile">
        <Col style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div>Data di acquista: {moment(details.createdAt).format('LLL')}</div>
            <div>Prezzo: {(+details.paid)?.toFixed(2)}</div>
            <div>Fee: {(+details.fee)?.toFixed(2)}</div>
            <div>Tipo: {details.purchaserType}</div>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}
DetailsModal.propTypes = {
  detailsModal: PropTypes.bool,
  details: PropTypes.object,
  detailsModalClose: PropTypes.func,
}
