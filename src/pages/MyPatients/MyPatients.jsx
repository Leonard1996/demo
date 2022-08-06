import { Col, Layout, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'

import './style.css'
import { getPatients } from '../../services'
import PropTypes from 'prop-types'
import Search from 'antd/es/input/Search'
import { Patient } from './Patient'

const PatientsList = ({ patients, select }) => {
  const [displayList, setDisplayList] = useState(patients)
  useEffect(() => {
    setDisplayList(patients)
  }, [patients])
  const onSearch = q => {
    if (!q) return setDisplayList(patients)
    setDisplayList(patients.filter(({ name, lastName }) => name.includes(q) || lastName.includes(q)))
  }
  const header = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      NOME E COGNOME{' '}
      <Search onChange={e => onSearch(e.target.value)} placeholder="Cerca" style={{ width: 200, marginLeft: '10px' }} />
    </div>
  )

  return (
    <List
      itemLayout="horizontal"
      pagination={{
        simple: true,
      }}
      header={header}
      dataSource={displayList}
      size="small"
      renderItem={item => (
        <List.Item onClick={() => select(item)} style={{ cursor: 'pointer' }}>
          <span style={{ textTransform: 'capitalize' }}>{item.name}</span>{' '}
          <span style={{ textTransform: 'capitalize' }}>{item.lastName}</span>
        </List.Item>
      )}
    />
  )
}

export const MyPatients = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState()
  useEffect(() => {
    getPatients().then(d => setPatients(d.data))
  }, [])
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Row
            className="patients"
            style={{ paddingTop: '55px', paddingLeft: '100px', justifyContent: 'space-between' }}
          >
            <Col style={{ textAlign: 'start' }}>
              <PatientsList patients={patients} select={setSelectedPatient} />
            </Col>

            <Col
              flex="auto"
              style={{
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '100%',
                paddingTop: '12px',
                marginLeft: '25px',
              }}
            >
              <Patient patient={selectedPatient} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

PatientsList.propTypes = {
  patients: PropTypes.array,
  select: PropTypes.func,
}
