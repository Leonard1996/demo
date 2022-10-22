import PropTypes from 'prop-types'
import { Button, Card, Col, DatePicker, Divider, Empty, Form, Input, message, Modal, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { addNote, getPatientDetails } from '../../services'
import { getToken } from '../../shared/utils'
import TextArea from 'antd/lib/input/TextArea'

export const Patient = ({ patient }) => {
  const [details, setDetails] = useState({})
  const [noteModal, setNoteModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(-1)
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

  const handleAddNote = async data => {
    selectedNote !== -1 ? (notes[selectedNote] = data) : notes.push(data)
    const dataToSend = { notes: JSON.stringify(notes) }
    const { error, msg } = await addNote(patient.id, dataToSend)
    if (error) return message.error(msg)
    message.success(msg)
    setSelectedNote(-1)
    getPatientDetails(patient.id).then(({ nextSessions, numberOfSessions: { numberOfSessions }, patientDetails }) =>
      setDetails({ nextSessions, numberOfSessions, patientDetails }),
    )
    setNoteModal(false)
  }

  const props = {
    showUploadList: false,
    name: 'consent',
    // eslint-disable-next-line no-undef
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
  let {
    patient: { consent, notes },
  } = patientDetails
  const {
    patient: {
      details: { question_1, question_2, question_3, question_4 },
    },
  } = patientDetails
  notes = notes ? JSON.parse(notes) : []
  const notesList = notes.map((note, i) => (
    <div
      style={{ cursor: 'pointer' }}
      key={i}
      onClick={() => {
        setSelectedNote(i)
        setNoteModal(true)
      }}
    >
      {moment(note.date).format('L')} - {note.title}
      <span style={{ marginLeft: '20px', color: '#9a77cf', float: 'right' }}> Modifica</span>
    </div>
  ))
  return (
    <>
      <NoteModal
        noteModal={noteModal}
        noteModalClose={() => {
          setNoteModal(false)
          setSelectedNote(-1)
        }}
        handleAddNote={handleAddNote}
        note={notes[selectedNote]}
      />
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
              <Button style={{ padding: '0 5px' }} type="text" onClick={() => setNoteModal(true)}>
                [CREA NUOVA]
              </Button>
              {notesList}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}
Patient.propTypes = {
  patient: PropTypes.object,
}

const NoteModal = ({ noteModal, noteModalClose, note, handleAddNote }) => {
  const [form] = Form.useForm()
  const handleCancel = () => {
    form.resetFields()
    noteModalClose()
  }
  useEffect(() => {
    form.resetFields()
    if (note?.date) note.date = moment(note.date)
    form.setFieldsValue(note || {})
  }, [note])
  return (
    <Modal
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="notesForm" htmlType="submit" key="submit" type="primary">
          Submit
        </Button>,
      ]}
      title={note ? 'Modifica Nota' : 'Nuova Nota'}
      visible={noteModal}
      onOk={handleAddNote}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        id="notesForm"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleAddNote}
        onFinishFailed={() => {}}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          name="date"
          label="Data"
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
        <Form.Item label="Titolo" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Note" name="note">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
NoteModal.propTypes = {
  noteModal: PropTypes.bool,
  noteModalClose: PropTypes.func,
  note: PropTypes.object,
  handleAddNote: PropTypes.func,
}
