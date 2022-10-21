import React, { useEffect, useState } from 'react'
import './style.css'
// eslint-disable-next-line no-unused-vars
import { Badge, Button, Col, DatePicker, Form, Input, Layout, message, Modal, Radio, Row, Space, Table } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'
import { createGiftCard, deleteGiftCard, getGiftCards } from '../../services'

export const GiftCards = () => {
  const columns = [
    {
      title: 'Codice',
      dataIndex: 'code',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Prezzo',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Validità da',
      dataIndex: 'from',
      sorter: (a, b) => a.from - b.from,
      render: text => <>{moment(text).format('L')}</>,
    },
    {
      title: 'Validità a',
      dataIndex: 'until',
      sorter: (a, b) => a.until - b.until,
      render: text => <>{moment(text).format('L')}</>,
    },
    {
      title: 'Riscattare',
      dataIndex: 'redemptionDate',
      width: 20,
      sorter: (a, b) => a.redemptionDate - b.redemptionDate,
      render: text => <>{text ? moment(text).format('L') : ''}</>,
    },
    {
      title: 'Azione',
      dataIndex: 'operation',
      key: 'operation',
      width: 2,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)} style={{ color: '#9a77cf' }}>
            Elimina
          </a>
        </Space>
      ),
    },
  ]
  const { Content } = Layout
  const [form] = Form.useForm()
  const [createModal, setCreateModal] = useState(false)
  const [giftCards, setGiftCards] = useState([])
  useEffect(() => {
    getGiftCards().then(d => setGiftCards(d))
  }, [])

  const handleDelete = async id => {
    setLoading(true)
    const { error, msg } = await deleteGiftCard(id)
    if (error) {
      return message.error(msg)
    }
    message.success('Gift Card deleted!')
    getGiftCards().then(d => setGiftCards(d))
    setLoading(false)
    setCreateModal(false)
  }

  const handleOk = async data => {
    setLoading(true)
    const { error, msg } = await createGiftCard(data)
    if (error) {
      return message.error(msg)
    }
    message.success('Gift Card created!')
    getGiftCards().then(d => setGiftCards(d))
    setLoading(false)
    setCreateModal(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setCreateModal(false)
  }

  const [loading, setLoading] = useState(false)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Modal
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancella
              </Button>,
              <Button
                form="createProductForm"
                htmlType="submit"
                key="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Crea
              </Button>,
            ]}
            title="Crea Gift Card"
            visible={createModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              id="createProductForm"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ typeOfProduct: 'standard', typeOfSession: 'single', status: 1 }}
              onFinish={handleOk}
              onFinishFailed={() => {}}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item label="Prezzo" name="price">
                <Input
                  addonAfter="€"
                  rules={[
                    {
                      required: true,
                      message: 'Please input price',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="from"
                label="Validità da"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please select start',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="until"
                label="Validità a"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please select end',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Modal>
          <Row style={{ paddingTop: '50px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <h2>Gift Cards</h2>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '100px', textAlign: 'end' }} align="middle">
            <Col flex="auto">
              <Button onClick={() => setCreateModal(true)} type="primary">
                Crea Gift Card
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={giftCards} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
