import {
  Badge,
  Button,
  // Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Radio,
  Row,
  Table,
  Dropdown,
  Space,
  Checkbox,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'
import { createPromoCode, getAllPatients } from '../../services'
import moment from 'moment'

export const AllPatients = () => {
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([
    'name',
    'lastName',
    'email',
    'isSingle',
    'doctor',
    'freeTrial',
    'credit',
    'doneSessions',
    'doneOrders',
  ])
  const handleOpenChange = flag => {
    setOpen(flag)
  }
  const availableColumns = {
    name: {
      title: 'Nome',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    lastName: {
      title: 'Cognome',
      dataIndex: 'lastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    email: {
      title: 'Email',
      dataIndex: 'email',
    },
    isSingle: {
      title: 'Tipologia',
      dataIndex: 'isSingle',
      render: text => (+text ? 'Singolo' : 'Coppia'),
    },
    doctor: {
      title: 'Terapeuta Assegnato',
      dataIndex: 'doctor',
    },
    freeTrial: {
      title: 'Free Trial',
      dataIndex: 'freeTrial',
    },
    solved: {
      title: 'Risolvo',
      dataIndex: 'solved',
      render: text => (+text ? 'Si' : 'No'),
    },
    credit: {
      title: 'Crediti',
      dataIndex: 'credit',
      width: 20,
      sorter: (a, b) => a.credit - b.credit,
    },
    doneSessions: {
      title: 'Sedute effettuate',
      dataIndex: 'doneSessions',
      width: 20,
      sorter: (a, b) => a.doneSessions - b.doneSessions,
    },
    doneOrders: {
      title: 'Nr Ordini effettuati',
      dataIndex: 'doneOrders',
      width: 20,
      sorter: (a, b) => a.doneOrders - b.doneOrders,
    },
    nextConfirmedSession: {
      title: 'Prossima Seduta Confermata',
      dataIndex: 'nextConfirmedSession',
      sorter: (a, b) => a.nextConfirmedSession - b.nextConfirmedSession,
      render: text => <>{text ? moment(text).format('LT') : ''}</>,
    },
    nextScheduledSession: {
      title: 'Prossima Seduta da Confermare',
      dataIndex: 'nextScheduledSession',
      sorter: (a, b) => a.nextScheduledSession - b.nextScheduledSession,
      render: text => <>{text ? moment(text).format('LT') : ''}</>,
    },
    isActive: {
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
            Attivo
          </>
        ) : (
          <>
            <Badge status="default" />
            Registrato
          </>
        ),
    },
  }

  useEffect(() => {
    let c = selectedColumns.map(k => availableColumns[k])
    c.push({
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 2,
      render: (_, record) => (
        <a onClick={() => handleEdit(record)} style={{ color: '#9a77cf' }}>
          Edit
        </a>
      ),
    })
    setColumns(c)
  }, [selectedColumns])

  const menu = () => {
    const onChange = value => {
      setSelectedColumns(value)
    }
    const options = Object.keys(availableColumns).map(key => {
      return (
        <div key={key}>
          <Checkbox value={key}>{availableColumns[key].title}</Checkbox>
        </div>
      )
    })
    return (
      <Menu>
        <Space direction="vertical">
          <Checkbox.Group defaultValue={selectedColumns} onChange={onChange}>
            {options}
          </Checkbox.Group>
        </Space>
      </Menu>
    )
  }

  // const columns = [
  //   {
  //     title: 'Nome',
  //     dataIndex: 'name',
  //     defaultSortOrder: 'ascend',
  //     sorter: (a, b) => a.name.localeCompare(b.name),
  //   },
  //   {
  //     title: 'Cognome',
  //     dataIndex: 'lastName',
  //     defaultSortOrder: 'ascend',
  //     sorter: (a, b) => a.lastName.localeCompare(b.lastName),
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //   },
  //   {
  //     title: 'Tipologia',
  //     dataIndex: 'isSingle',
  //     render: text => (+text ? 'Singolo' : 'Coppia'),
  //   },
  //   {
  //     title: 'Terapeuta Assegnato',
  //     dataIndex: 'doctor',
  //   },
  //   {
  //     title: 'Free Trial',
  //     dataIndex: 'freeTrial',
  //   },
  //   {
  //     title: 'Risolvo',
  //     dataIndex: 'solved',
  //     render: text => (+text ? 'Si' : 'No'),
  //   },
  //   {
  //     title: 'Crediti',
  //     dataIndex: 'credit',
  //     width: 20,
  //     sorter: (a, b) => a.credit - b.credit,
  //   },
  //   {
  //     title: 'Sedute effettuate',
  //     dataIndex: 'doneSessions',
  //     width: 20,
  //     sorter: (a, b) => a.doneSessions - b.doneSessions,
  //   },
  //   {
  //     title: 'Nr Ordini effettuati',
  //     dataIndex: 'doneOrders',
  //     width: 20,
  //     sorter: (a, b) => a.doneOrders - b.doneOrders,
  //   },
  //   {
  //     title: 'Prossima Seduta Confermata',
  //     dataIndex: 'nextConfirmedSession',
  //     sorter: (a, b) => a.nextConfirmedSession - b.nextConfirmedSession,
  //     render: text => <>{moment(text).format('LT')}</>,
  //   },
  //   {
  //     title: 'Prossima Seduta da Confermare',
  //     dataIndex: 'nextScheduledSession',
  //     sorter: (a, b) => a.nextScheduledSession - b.nextScheduledSession,
  //     render: text => <>{moment(text).format('LT')}</>,
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'isActive',
  //     width: 120,
  //     filters: [
  //       {
  //         text: 'Active',
  //         value: 1,
  //       },
  //       {
  //         text: 'Inactive',
  //         value: 0,
  //       },
  //     ],
  //     onFilter: (value, record) => +record.isActive === value,
  //     sorter: (a, b) => a.isActive - b.isActive,
  //     render: text =>
  //       +text ? (
  //         <>
  //           <Badge status="success" />
  //           Attivo
  //         </>
  //       ) : (
  //         <>
  //           <Badge status="default" />
  //           Registrato
  //         </>
  //       ),
  //   },
  //   {
  //     title: 'Action',
  //     dataIndex: 'operation',
  //     key: 'operation',
  //     width: 2,
  //     render: (_, record) => (
  //       <a onClick={() => handleEdit(record)} style={{ color: '#9a77cf' }}>
  //         Edit
  //       </a>
  //     ),
  //   },
  // ]
  const { Content } = Layout
  const [form] = Form.useForm()
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [createModal, setCreateModal] = useState(false)
  const [patients, setPatients] = useState([])
  useEffect(() => {
    getAllPatients().then(d => setPatients(d))
  }, [])

  const handleEdit = data => {
    delete data.createdAt
    delete data.updatedAt
    form.setFieldsValue(data)
    setCreateModal(true)
  }

  const handleOk = async data => {
    setLoading(true)
    const { error, msg } = await createPromoCode(data)
    if (error) {
      return message.error(msg)
    }
    message.success('Promo Code created!')
    // getPromoCodes().then(d => setPromoCodes(d))
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
              <h2>Pazienti</h2>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '100px', textAlign: 'end' }} align="middle">
            <Col flex="auto">
              <Dropdown overlay={menu} trigger={['click']} onOpenChange={handleOpenChange} open={open}>
                <a onClick={e => e.preventDefault()}>
                  <Button type="primary">Modifica Colonne</Button>
                </a>
              </Dropdown>
            </Col>
          </Row>
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table columns={columns} dataSource={patients} onChange={onChange} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
