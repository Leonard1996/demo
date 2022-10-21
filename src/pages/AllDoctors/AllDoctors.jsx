import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Table,
  Radio,
  Checkbox,
  Menu,
  Space,
  Dropdown,
  Divider,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'
import { getAllDoctorsStatistics, updateDoctor } from '../../services'
import moment from 'moment'
import PropTypes from 'prop-types'

export const AllDoctors = () => {
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
    birthday: {
      title: 'Data di nascita',
      dataIndex: 'birthday',
      sorter: (a, b) => a.birthday - b.birthday,
      width: 120,
      render: text => <>{text ? moment(text).format('L') : ''}</>,
    },
    age: {
      title: 'Età',
      dataIndex: 'birthday',
      sorter: (a, b) => a.birthday - b.birthday,
      render: text => <>{text ? moment().diff(text, 'years') : ''}</>,
    },
    gender: {
      title: 'Genere',
      dataIndex: 'gender',
    },
    phone: {
      title: 'Tel.',
      dataIndex: 'phone',
    },
    state: {
      title: 'Paese di Residenza',
      dataIndex: 'state',
    },
    province: {
      title: 'Regione di Residenza',
      dataIndex: 'province',
    },
    iva: {
      title: 'P. Iva',
      dataIndex: 'iva',
    },
    experiences: {
      title: 'Specializzazioni',
      dataIndex: 'experiences',
    },
    type: {
      title: 'Tipologia',
      dataIndex: 'type',
    },
    createdAt: {
      title: 'Data registrazione',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: text => <>{text ? moment(text).format('L') : ''}</>,
    },
    school: {
      title: 'Scuola di Specializzazione',
      dataIndex: 'school',
      render: text => (+text ? 'Si' : 'No'),
    },
    totalPatients: {
      title: 'Totale pazienti assegnati',
      dataIndex: 'totalPatients',
      width: 20,
      sorter: (a, b) => a.totalPatients - b.totalPatients,
    },
    nonPagantePatients: {
      title: 'Totale non pagante',
      dataIndex: 'nonPagantePatients',
      width: 20,
      sorter: (a, b) => a.nonPagantePatients - b.nonPagantePatients,
    },
    rate: {
      title: 'Rate',
      dataIndex: 'rate',
      width: 20,
      sorter: (a, b) => a.rate - b.rate,
    },
    numberOfSessions: {
      title: 'Totale sessioni pagate',
      dataIndex: 'numberOfSessions',
      width: 20,
      sorter: (a, b) => a.numberOfSessions - b.numberOfSessions,
    },
    totalMoneyEarned: {
      title: 'Revenues sessioni pagate',
      dataIndex: 'totalMoneyEarned',
      width: 20,
      sorter: (a, b) => a.totalMoneyEarned - b.totalMoneyEarned,
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
            Active
          </>
        ) : (
          <>
            <Badge status="default" />
            Inactive
          </>
        ),
    },
  }
  const [selectedColumns, setSelectedColumns] = useState([
    'name',
    'lastName',
    'email',
    'totalPatients',
    'nonPagantePatients',
    'rate',
    'numberOfSessions',
    'totalMoneyEarned',
    'isActive',
  ])
  const [columns, setColumns] = useState([])
  const [detailsModal, setDetailsModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(0)
  const { Content } = Layout
  const [form] = Form.useForm()

  const [createModal, setCreateModal] = useState(false)
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    getAllDoctorsStatistics().then(d => setDoctors(d))
  }, [])

  useEffect(() => {
    let c = selectedColumns.map(k => availableColumns[k])
    c.push({
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 2,
      render: (_, record) => (
        <a onClick={e => handleEdit(record, e)} style={{ color: '#9a77cf' }}>
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

  const handleEdit = (data, e) => {
    e.stopPropagation()
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
    getAllDoctorsStatistics().then(d => setDoctors(d))
    setLoading(false)
    setCreateModal(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setCreateModal(false)
  }

  const openDetailsModal = doctor => {
    setSelectedDoctor(doctor)
    setDetailsModal(true)
  }

  const [loading, setLoading] = useState(false)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <DetailsModal
            details={selectedDoctor}
            detailsModal={detailsModal}
            detailsModalClose={() => setDetailsModal(false)}
          />
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
          <Row style={{ paddingLeft: '100px', textAlign: 'end' }} align="middle">
            <Col flex="auto">
              <Dropdown overlay={menu} trigger={['click']} onOpenChange={setOpen} open={open}>
                <a onClick={e => e.preventDefault()}>
                  <Button type="primary">Modifica Colonne</Button>
                </a>
              </Dropdown>
            </Col>
          </Row>
          <Row style={{ paddingTop: '20px', paddingLeft: '100px', textAlign: 'start' }} align="middle">
            <Col flex="auto">
              <Table
                columns={columns}
                dataSource={doctors}
                onRow={record => {
                  return {
                    onClick: () => openDetailsModal(record), // click row
                  }
                }}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

const DetailsModal = ({ detailsModal, detailsModalClose, details = {} }) => {
  const { name, lastName, birthday, email, createdAt, isActive } = details
  const specs = details.experiences ? details.experiences.split(',').map((p, i) => <div key={i}>{p}</div>) : <></>
  const patients = details.patients ? (
    details.patients.map((p, i) => (
      <div key={i}>
        {p.patient.name} {p.patient.lastName}
      </div>
    ))
  ) : (
    <></>
  )
  return (
    <Modal
      width={1200}
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
        <Col span={8} style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div style={{ fontWeight: 'bold' }}>
              {name} {lastName}
            </div>
            <div>Email: {email}</div>
            <div>Numero di telefono: {details.phone}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Dati Anagrafici</div>
            <div className="birthday">Data di nascita: {moment(birthday).format('l')}</div>
            <div>Età: {moment().diff(birthday, 'years')} anni</div>
            <div>Genere: {details.gender}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Dati Fiscali</div>
            <div>
              Indrizzo: {details.province}, {details.state}
            </div>
            <div>P. Iva: {details.iva}</div>
            <div>IBAN: {details.iban}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Descrizione</div>
            <div>{details.cover_letter}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Spcializzazioni</div>
            {specs}
            {/*<Divider style={{ margin: '10px 0' }} />*/}
            {/*<div className="newsletter">Newsletter: {+newsletter ? 'SI' : 'NO'}</div>*/}
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div style={{ fontWeight: 'bold' }}>Tipologia</div>
            <div>{details.type}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Contratto</div>
            <div>Data inizio: {moment(createdAt).format('l')}</div>
            <div>Status: {isActive ? 'Attivo' : 'Inattivo'}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Costi</div>
            <div>Rate: {details.rate}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Statistiche</div>
            <div>Totale Sessioni: {details.numberOfSessions}</div>
            <div>Revenues Sessioni Pagate: {details.totalMoneyEarned}</div>
            <div>Totale pazienti assegnati: {details.totalPatients}</div>
            <div>Totale non pagante: {details.nonPagantePatients}</div>
            <div>Totale pazienti attivo: {details.totalPatientsActive}</div>
            <div>Totale pazienti inattivo: {details.totalPatientsInactive}</div>
            <div>Totale pazienti risolto: {details.totalPatientsSolved}</div>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div style={{ fontWeight: 'bold' }}>Lista Pazienti Assegnati</div>
            {patients}
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
