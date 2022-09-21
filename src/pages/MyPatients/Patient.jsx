import PropTypes from 'prop-types'
import { Button, Card, Col, Divider, Empty, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getPatientDetails } from '../../services'

export const Patient = ({ patient }) => {
  const [details, setDetails] = useState({})
  useEffect(() => {
    if (patient)
      getPatientDetails(patient.id).then(({ nextSessions, numberOfSessions: { numberOfSessions }, patientDetails }) =>
        setDetails({ nextSessions, numberOfSessions, patientDetails }),
      )
    console.log(details)
  }, [patient])
  if (!patient)
    return (
      <Card title="Profilo di paziente">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    )
  const { name, lastName, birthday, gender, isSingle, credit } = patient
  const { nextSessions, numberOfSessions, patientDetails = { patient: { details: {} } } } = details
  const {
    patient: {
      details: { question_1, question_2, question_3, question_4 },
    },
  } = patientDetails
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
          <div>Sedute già effetuate: {numberOfSessions}</div>
          <div>Prossime sedute:</div>
          <div>{nextSessions ? moment(nextSessions.startTime).format('L') : ''}</div>
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
