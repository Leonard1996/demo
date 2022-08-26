import PropTypes from 'prop-types'
import { Button, Card, Col, Divider, Empty, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getPatientDetails } from '../../services'

export const Patient = ({ patient = {} }) => {
  const [d, setD] = useState({})
  useEffect(() => {
    getPatientDetails(patient.id).then(d => setD(d.data))
    console.log(d)
  }, [patient])
  if (!patient)
    return (
      <Card title="Profilo di paziente">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    )
  const {
    name,
    lastName,
    birthday,
    gender,
    isSingle,
    credit,
    sessions = 0,
    nextSession = 'N/A',
    details: { question_1, question_2, question_3, question_4 } = {},
  } = patient
  return (
    <Card title="Profilo di paziente" style={{ textAlign: 'start', fontSize: '16px' }}>
      <Row>
        <Col span={12}>
          <div>
            <span style={{ textTransform: 'capitalize' }}>{name}</span>{' '}
            <span style={{ textTransform: 'capitalize' }}>{lastName}</span>
          </div>
          <div>{moment(birthday).format('l')}</div>
          <div>Etá: {moment().diff(birthday, 'years')} anni</div>
          <div>{gender}</div>
          <div>{isSingle ? 'SINGOLO' : 'COPIA'}</div>
          <div>Crediti: {credit}</div>
        </Col>
        <Col span={12}>
          <div>Sedute già effetuate: {sessions}</div>
          <div>Prossime sedute:</div>
          <div>{nextSession}</div>
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} />
      <Row>
        <Col>
          <div>CONSESO INFORMATO</div>
          <div>
            Scarica conseso informato compilato del paziente
            <Button style={{ padding: '0 5px' }} type="text">
              [DOWNLOAD]
            </Button>
          </div>
          <div>
            Carica conseso informato controfirmato
            <Button style={{ padding: '0 5px' }} type="text">
              [UPLOAD]
            </Button>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} />
      <Row>
        <Col>
          <div style={{ marginBottom: '5px' }}>Risposte al questionario:</div>
          <div>{question_1}</div>
          <div>{question_2}</div>
          <div>{question_3}</div>
          <div>{question_4}</div>
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} />
      <Row>
        <Col>
          <div>
            NOTES{' '}
            <Button style={{ padding: '0 5px' }} type="text">
              [CREA NUOVA]
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

Patient.propTypes = {
  patient: PropTypes.object,
}
