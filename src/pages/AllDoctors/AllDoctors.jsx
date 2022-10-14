import { Badge, Button, Col, Form, Input, Layout, message, Modal, Row, Table, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'
import { getAllDoctors, updateDoctor } from '../../services'

export const AllDoctors = () => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Cognome',
      dataIndex: 'lastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Totale pazienti assegnati',
      dataIndex: 'totalPatients',
      width: 20,
      sorter: (a, b) => a.totalPatients - b.totalPatients,
    },
    {
      title: 'Totale non pagante',
      dataIndex: 'nonPagantePatients',
      width: 20,
      sorter: (a, b) => a.nonPagantePatients - b.nonPagantePatients,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: 20,
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: 'Totale sessioni',
      dataIndex: 'numberOfSessions',
      width: 20,
      sorter: (a, b) => a.numberOfSessions - b.numberOfSessions,
    },
    {
      title: 'Revenues sessioni pagate',
      dataIndex: 'totalMoneyEarned',
      width: 20,
      sorter: (a, b) => a.totalMoneyEarned - b.totalMoneyEarned,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
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
      onFilter: (value, record) => +record.isActive === value,
      sorter: (a, b) => a.isActive - b.isActive,
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
        <a onClick={() => handleEdit(record)} style={{ color: '#9a77cf' }}>
          Edit
        </a>
      ),
    },
  ]
  const { Content } = Layout
  const [form] = Form.useForm()
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [createModal, setCreateModal] = useState(false)
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    getAllDoctors().then(d => setDoctors(d))
  }, [])

  const handleEdit = data => {
    delete data.createdAt
    delete data.updatedAt
    form.setFieldsValue(data)
    setCreateModal(true)
  }

  const handleOk = async data => {
    setLoading(true)
    console.log({ data })
    const { error, msg } = await updateDoctor(data)
    if (error) {
      return message.error(msg)
    }
    message.success('Doctor updated!')
    // getPromoCodes().then(d => setPromoCodes(d))
    getAllDoctors().then(d => setDoctors(d))
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
            title="Modifica Terapeuta"
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
                label="Nome"
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
              <Form.Item
                label="Cognome"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Rate"
                name="rate"
                rules={[
                  {
                    required: true,
                    message: 'Please input name',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="id" name="id" hidden={true}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Modify activity"
                name="isActive"
                // rules={[
                //   {
                //     required: true,
                //     defaultField
                //     message: 'Please input name',
                //   },
                // ]}
              >
                {/* <Input /> */}
                {/* <Radio.Group onChange={onChange} value={doc}> */}
                <Radio.Group defaultValue={form.getFieldValue('isActive')}>
                  <Radio value={1}>Activate</Radio>
                  <Radio value={0}>Deactivate</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
          <Row style={{ paddingTop: '50px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <h2>Terapeuti</h2>
            </Col>
          </Row>
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={doctors} onChange={onChange} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
