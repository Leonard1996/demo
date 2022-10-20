import {
  Badge,
  Button,
  Col,
  Form,
  Layout,
  Menu,
  Modal,
  Row,
  Table,
  Dropdown,
  Space,
  Checkbox,
  Select,
  Divider,
} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { HeaderMenu, SideMenu } from '../../modules'
import { assignDoctor, getAllDoctors, getAllPatients, getPatientDoctors } from '../../services'

import './style.css'
import { Content } from 'antd/es/layout/layout'

export const AllPatients = () => {
  const [patients, setPatients] = useState([])
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState([])

  const [detailsModal, setDetailsModal] = useState(false)

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
  const [assignModal, setAssignModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [selectedPatient, setSelectedPatient] = useState()

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
      dataIndex: 'doctor', // openAssignModal
      render: (text, record) => (
        <a onClick={e => openAssignModal(record.id, e)} style={{ color: '#9a77cf' }}>
          {text || 'Assign'}
        </a>
      ),
    },
    freeTrial: {
      title: 'Free Trial',
      dataIndex: 'freeTrial',
    },
    solved: {
      title: 'Risolto',
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
      render: text => <>{text ? moment(text).format('LLL') : ''}</>,
    },
    nextScheduledSession: {
      title: 'Prossima Seduta da Confermare',
      dataIndex: 'nextScheduledSession',
      sorter: (a, b) => a.nextScheduledSession - b.nextScheduledSession,
      render: text => <>{text ? moment(text).format('LLL') : ''}</>,
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
    phone: {
      title: 'Tel.',
      dataIndex: 'phone',
    },
    city: {
      title: 'Città',
      dataIndex: 'city',
    },
    address: {
      title: 'Indrizzo',
      dataIndex: 'address',
    },
    zip: {
      title: 'Codice Fiscale',
      dataIndex: 'zip',
    },
    createdAt: {
      title: 'Data registrazione',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: text => <>{text ? moment(text).format('L') : ''}</>,
    },
    lastDoneSession: {
      title: 'Ultima Seduta Effettuata',
      dataIndex: 'lastDoneSession',
      sorter: (a, b) => a.lastDoneSession - b.lastDoneSession,
      render: text => <>{text ? moment(text).format('LLL') : ''}</>,
    },
    lastOrderDone: {
      title: 'Ultimo Ordine Effettuato',
      dataIndex: 'lastOrderDone',
      sorter: (a, b) => a.lastOrderDone - b.lastOrderDone,
      render: text => <>{text ? moment(text).format('LLL') : ''}</>,
    },
    totalPurchasedSessions: {
      title: 'Totale Sedute Acquistate',
      dataIndex: 'totalPurchasedSessions',
    },
    totalSingleSessionsPurchased: {
      title: 'Totale Singole Sedute Acquistate',
      dataIndex: 'totalSingleSessionsPurchased',
    },
    totalMultipleSessionsPurchased: {
      title: 'Totale Pacchetti Acquistate',
      dataIndex: 'totalMultipleSessionsPurchased',
    },
    giftCardsPurchased: {
      title: 'Gift Cards Acquistate',
      dataIndex: 'giftCardsPurchased',
    },
    revenue: {
      title: 'Revenues',
      dataIndex: 'revenue',
      render: text => <>{text ? text.gross : ''}</>,
    },
    cost: {
      title: 'Costo',
      dataIndex: 'cost',
    },
    hasUsedPromoCode: {
      title: 'Codici Sconto Usati',
      dataIndex: 'hasUsedPromoCode',
    },
    newsletter: {
      title: 'Newsletter',
      dataIndex: 'newsletter',
      render: text => (+text ? 'Si' : 'No'),
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
    getAllPatients().then(d => setPatients(d))
  }, [])

  useEffect(() => {
    let c = selectedColumns.map(k => availableColumns[k])
    // c.push({
    //   title: 'Action',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   width: 2,
    //   render: (_, record) => (
    //     <a onClick={() => handleEdit(record)} style={{ color: '#9a77cf' }}>
    //       Edit
    //     </a>
    //   ),
    // })
    setColumns(c)
  }, [selectedColumns])

  const handleOpenChange = flag => {
    setOpen(flag)
  }

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

  const openDetailsModal = (patient, target) => {
    console.log(target)
    setSelectedPatient(patient)
    setDetailsModal(true)
  }

  const openAssignModal = (userId, e) => {
    e.stopPropagation()
    setAssignModal(true)
    setSelectedUser(userId)
  }

  const assignDoctorModal = async doctorId => {
    setAssignModal(false)
    await assignDoctor({ patientId: selectedUser, doctorId })
    getAllPatients().then(d => setPatients(d))
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <AssignModal
            assignModal={assignModal}
            assignDoctorModal={assignDoctorModal}
            assignModalClose={() => setAssignModal(false) && setSelectedUser(null)}
          />
          <DetailsModal
            details={selectedPatient}
            detailsModal={detailsModal}
            detailsModalClose={() => setDetailsModal(false)}
          />
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
            <Col flex="auto" style={{ whiteSpace: 'nowrap' }}>
              <Table
                columns={columns}
                dataSource={patients}
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
  const {
    name,
    lastName,
    birthday,
    email,
    isSingle,
    createdAt,
    isActive,
    userAsPatient = {},
    solved,
    latestDoctor: { doctor = {} } = {},
  } = details
  const { freeTrial, consent, newsletter, details: { address, zip, city, phone } = {} } = userAsPatient
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    if (details.id) getPatientDoctors(details.id).then(d => setDoctors(d))
  }, [details])
  const docs = doctors.map(doc => `${doc.name} ${doc.lastName}`)
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
            <div>Numero di telefono: {phone}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Dati Anagrafici</div>
            <div className="birthday">Data di nascita: {moment(birthday).format('l')}</div>
            <div>Età: {moment().diff(birthday, 'years')} anni</div>
            <Divider style={{ margin: '10px 0' }} />
            <div className="payment-details">
              <div style={{ fontWeight: 'bold' }}>Dati di fatturazione</div>
              <div>Address: {address}</div>
              <div>ZIP: {zip}</div>
              <div>City: {city}</div>
            </div>
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ fontWeight: 'bold' }}>Preferenze</div>
            <div className="newsletter">Newsletter: {newsletter ? 'SI' : 'NO'}</div>
            {/*<Divider style={{ margin: '10px 0' }} />*/}
            {/*<div className="newsletter">Newsletter: {+newsletter ? 'SI' : 'NO'}</div>*/}
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div>Tipologia: {isSingle ? 'Singolo' : 'Copia'}</div>
            <div>Data registrazione: {moment(createdAt).format('l')}</div>
            <div>Status: {isActive ? 'Attivo' : 'Inattivo'}</div>
            <div>Free trial: {freeTrial}</div>
            <div>Risolto: {+solved ? 'Si' : 'No'}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>
              Conseso Informato:{' '}
              {consent ? (
                <span>
                  Si
                  <a style={{ color: '#9a77cf' }} href={consent} target="_blank" rel="noopener noreferrer">
                    Visualizza
                  </a>
                </span>
              ) : (
                'No'
              )}
            </div>
            <Divider style={{ margin: '10px 0' }} />
            <div>
              Terapeuta assegnato: {doctor.name} {doctor.lastName}
            </div>
            <div>Terapeuti precedenti: {docs.join(', ')}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>Sedute effettuate: {details.doneSessions}</div>
            <div>
              Prossima Seduta da Confermare:{' '}
              {details.nextScheduledSession && moment(details.nextScheduledSession).format('l')}
            </div>
            <div>
              Prossima Seduta Confermata:{' '}
              {details.nextConfirmedSession && moment(details.nextConfirmedSession).format('l')}
            </div>
            <div>
              Ultima Seduta Effettuata:{' '}
              {details.lastDoneSession?.startTime && moment(details.lastDoneSession?.startTime).format('l')}
            </div>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Space size={10} direction="vertical">
            <div>Revenues: {details.revenue?.gross}</div>
            <div>Crediti: {details.credit}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>Ordini effettuati: {details.doneOrders}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>Totale sedute acquistate: {details.totalPurchasedSessions}</div>
            <div>Totale singolo sedute acquistate: {details.totalSingleSessionsPurchased}</div>
            <div>Totale pacchetti acquistate: {details.totalMultipleSessionsPurchased}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>Gift cards acquistate: {details.giftCardsPurchased}</div>
            <div>Codici sconto utilizzati: {details.hasUsedPromoCode}</div>
            <Divider style={{ margin: '10px 0' }} />
            <div>Costo: {details.cost}</div>
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

const AssignModal = ({ assignModal, assignDoctorModal, assignModalClose }) => {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    if (!assignModal) return
    getAllDoctors().then(d => {
      setDoctors(d)
    })
  }, [assignModal])
  const doctorOptions = doctors.map((p, i) => (
    <Select.Option key={i} value={p.id}>
      {p.name} {p.lastName}
    </Select.Option>
  ))
  const handleCancel = () => {
    form.resetFields()
    assignModalClose()
  }
  const handleOk = async data => {
    assignDoctorModal(data.doctor)
  }
  const [form] = Form.useForm()
  return (
    <Modal
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="assignForm"
          htmlType="submit"
          key="submit"
          type="primary"
          // onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
      title="Assign Doctor"
      visible={assignModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        id="assignForm"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleOk}
        onFinishFailed={() => {}}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item label="Doctor" name="doctor">
          <Select>{doctorOptions}</Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
AssignModal.propTypes = {
  assignModal: PropTypes.bool,
  assignDoctorModal: PropTypes.func,
  assignModalClose: PropTypes.func,
}
