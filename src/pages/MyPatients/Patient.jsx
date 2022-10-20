import PropTypes from 'prop-types'
import { Button, Card, Col, Divider, Empty, message, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getPatientDetails } from '../../services'
import { getToken } from '../../shared/utils'

export const Patient = ({ patient }) => {
  const [details, setDetails] = useState({})
  useEffect(() => {
    if (patient)
      getPatientDetails(patient.id).then(({ nextSessions, numberOfSessions: { numberOfSessions }, patientDetails }) =>
        setDetails({ nextSessions, numberOfSessions, patientDetails }),
      )
  }, [patient])
  if (!patient)
    return (
      <Card title="Profilo di paziente">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    )

  const openConsent = async consent => {
    window.open(consent)
  }
  const props = {
    showUploadList: false,
    name: 'consent',
    action: `${process.env.REACT_APP_API_URL}/patients-doctors/consent/${patient.id}`,
    headers: {
      authorization: `Bearer ${getToken()}`,
    },

    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const { name, lastName, birthday, gender, isSingle, credit } = patient
  const { nextSessions, numberOfSessions, patientDetails = { patient: { details: {} } } } = details
  const {
    patient: { consent },
  } = patientDetails
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
          <div>Età: {moment().diff(birthday, 'years')} anni</div>
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
          <div>CONSENSO INFORMATO</div>
          <div>
            Scarica consenso informato compilato dal paziente
            <Button onClick={() => openConsent(consent)} style={{ padding: '0 5px' }} type="text" disabled={!consent}>
              [DOWNLOAD]
            </Button>
          </div>
          <div>
            Carica consenso informato controfimato
            <Upload {...props}>
              <Button style={{ marginBottom: '30px' }} disabled={!consent} type="text">
                [UPLOAD]
              </Button>
            </Upload>
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
