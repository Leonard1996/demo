import React, { useEffect, useState } from 'react'
import './style.css'
// eslint-disable-next-line no-unused-vars
import { Badge, Button, Col, DatePicker, Form, Input, Layout, message, Modal, Radio, Row, Space, Table } from 'antd'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'
import { createPromoCode, deletePromoCode, getPromoCodes } from '../../services'

export const PromoCodes = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: 'Nr. of Sessions',
      dataIndex: 'numberOfSessions',
      width: 20,
      sorter: (a, b) => a.numberOfSessions - b.numberOfSessions,
    },
    {
      title: 'Flat Discount',
      dataIndex: 'flatDiscount',
      width: 20,
      sorter: (a, b) => a.flatDiscount - b.flatDiscount,
    },
    {
      title: 'Percentage Discount',
      dataIndex: 'percentageDiscount',
      width: 20,
      sorter: (a, b) => a.percentageDiscount - b.percentageDiscount,
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
      title: 'Usability',
      dataIndex: 'usability',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'User',
      dataIndex: 'user',
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      filters: [
        {
          text: 'Active',
          value: 1,
        },
        {
          text: 'Inactive',
          value: 0,
        },
      ],
      onFilter: (value, record) => +record.status === value,
      sorter: (a, b) => a.status - b.status,
      render: text =>
        +text ? (
          <>
            <Badge status="success" />
            Active
          </>
        ) : (
          <>
            <Badge status="default" />
            Inactive
          </>
        ),
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 2,
      render: (_, record) => (
        <Space size="0">
          <a onClick={() => handleEdit(record)} style={{ color: '#9a77cf' }}>
            Edit
          </a>
          <a onClick={() => handleDelete(record.id)} style={{ color: '#9a77cf' }}>
            Delete
          </a>
        </Space>
      ),
    },
  ]
  const { Content } = Layout
  const [form] = Form.useForm()
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [createModal, setCreateModal] = useState(false)
  const [promoCodes, setPromoCodes] = useState([])
  useEffect(() => {
    getPromoCodes().then(d => setPromoCodes(d))
  }, [])

  const handleEdit = data => {
    delete data.createdAt
    delete data.updatedAt
    data.from = moment(data.from)
    data.until = moment(data.until)
    form.setFieldsValue(data)
    setCreateModal(true)
  }

  const handleDelete = async id => {
    setLoading(true)
    const { error, msg } = await deletePromoCode(id)
    if (error) {
      return message.error(msg)
    }
    message.success('Promo Code deleted!')
    getPromoCodes().then(d => setPromoCodes(d))
    setLoading(false)
    setCreateModal(false)
  }

  const handleOk = async data => {
    setLoading(true)
    const { error, msg } = await createPromoCode(data)
    if (error) {
      return message.error(msg)
    }
    message.success('Promo Code created!')
    getPromoCodes().then(d => setPromoCodes(d))
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
                Cancel
              </Button>,
              <Button
                form="createProductForm"
                htmlType="submit"
                key="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Submit
              </Button>,
            ]}
            title="Create Product"
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
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input name',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Type" name="type">
                <Radio.Group>
                  <Radio.Button value="standard">Standard</Radio.Button>
                  <Radio.Button value="welcome">Welcome Promo</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Number of Sessions"
                name="numberOfSessions"
                rules={[
                  {
                    required: true,
                    message: 'Please input number of sessions',
                  },
                ]}
              >
                <Input placeholder="1,2,N" />
              </Form.Item>

              <Form.Item label="Flat Discount" name="flatDiscount">
                <Input />
              </Form.Item>

              <Form.Item label="Percentage Discount" name="percentageDiscount">
                <Input addonAfter="%" />
              </Form.Item>

              <Form.Item
                name="from"
                label="Validity From"
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
                label="Validity To"
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

              <Form.Item label="Usability" name="usability">
                <Input />
              </Form.Item>

              <Form.Item label="User" name="userId">
                <Input />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Radio.Group>
                  <Radio.Button value={1}>Active</Radio.Button>
                  <Radio.Button value={0}>Inactive</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="id" name="id" hidden={true}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Row style={{ paddingTop: '50px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <h2>Promo Codes</h2>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '100px', textAlign: 'end' }} align="middle">
            <Col flex="auto">
              <Button onClick={() => setCreateModal(true)} type="primary">
                Create Promo Codes
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={promoCodes} onChange={onChange} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
