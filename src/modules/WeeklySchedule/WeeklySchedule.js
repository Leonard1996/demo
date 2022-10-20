import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Col, Form, Popover, Select } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const getWeekDays = week => {
  const startDay = moment().week(week).startOf('week')
  let date = startDay.clone().subtract(1, 'day')
  return Array(7)
    .fill(0)
    .map(() => date.add(1, 'day').clone())
}

const DayHeader = ({ day }) => {
  const isToday = moment(day).isSame(moment(), 'day') ? { color: '#9a77cf' } : {}
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ fontSize: '45px', display: 'flex', alignItems: 'center', height: '45px', ...isToday }}>
        <span>{day.format('D')}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'left',
          marginLeft: '7px',
          color: '#666',
          ...isToday,
        }}
      >
        <div style={{ textTransform: 'capitalize', fontSize: '14px', fontWeight: 'bold' }}>{day.format('dddd')}</div>
        <div style={{ textTransform: 'capitalize', fontSize: '12px' }}>
          {day.format('MMMM')} {day.format('YYYY')}
        </div>
      </div>
    </div>
  )
}
DayHeader.propTypes = {
  day: PropTypes.object,
}

const DayTimeSlots = ({ day, events, addEvent, patients }) => {
  const startTime = moment(day).hour(0).minutes(0).seconds(0)
  const times = Array(24)
    .fill(0)
    .map(() => ({ startTime: startTime.add(1, 'second').clone(), endTime: startTime.add(3599, 'seconds').clone() }))
  const slots = times.map(({ startTime: sStart, endTime: sEnd }, i) => {
    const hasEvent = events.filter(
      ({ startTime: eStart, endTime: eEnd }) => moment(eStart) < moment(sEnd) && moment(eEnd) > moment(sStart),
    )[0]
    let first = false
    let styleTop = {}
    let paddingTop = {}
    let paddingBot = {}
    if (hasEvent) {
      if (moment(hasEvent.startTime).valueOf() === moment(sStart).valueOf()) {
        styleTop = { borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }
        paddingTop = { paddingTop: '2px' }
        first = true
      } else {
        styleTop = { marginTop: '-1px', height: 'calc(100% + 1px)' }
      }
    }
    let styleBot = {}
    if (hasEvent) {
      if (moment(hasEvent.endTime).valueOf() === moment(sEnd).valueOf()) {
        styleBot = { borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }
        paddingBot = { paddingBottom: '2px' }
      }
    }

    const startTimeOptions = times.map(({ startTime }, i) => (
      <Select.Option key={i} value={startTime.toISOString()}>
        {startTime.format('LT')}
      </Select.Option>
    ))
    const endTimeOptions = times.map(({ endTime }, i) => (
      <Select.Option key={i} value={endTime.toISOString()}>
        {endTime.format('LT')}
      </Select.Option>
    ))

    const [visible, setVisible] = useState(false)
    const handleVisibleChange = newVisible => {
      setVisible(newVisible)
    }
    const onFinish = value => {
      hasEvent ? addEvent({ ...hasEvent, ...value }) : addEvent(value)
      setVisible(false)
    }
    const patientsOptions = patients.map((p, i) => (
      <Select.Option key={i} value={p.id}>
        {p.name} {p.lastName}
      </Select.Option>
    ))
    const initData = { startTime: sStart.toISOString(), endTime: sEnd.toISOString(), ...hasEvent }
    const popContent = (
      <Form
        name="basic"
        labelAlign={'left'}
        labelWrap={true}
        autoComplete="off"
        requiredMark={false}
        colon={false}
        preserve={true}
        onFinish={onFinish}
        initialValues={initData}
        labelCol={{ span: 8 }}
      >
        <Form.Item label="Paziente" name="patientId" rules={[{ required: true, message: 'Please select a patient!' }]}>
          <Select placeholder="Please select a patient">{patientsOptions}</Select>
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Dalle ore"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select start time',
            },
          ]}
        >
          <Select placeholder="Please select a start time">{startTimeOptions}</Select>
        </Form.Item>
        <Form.Item
          name="endTime"
          label="Alle ore"
          hasFeedback
          dependencies={['startTime']}
          rules={[
            {
              required: true,
              message: 'Please select start time',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('startTime').valueOf() < value.valueOf()) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('End time should be later then start time'))
              },
            }),
          ]}
        >
          <Select placeholder="Please select a start time">{endTimeOptions}</Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Crea
          </Button>
        </Form.Item>
      </Form>
    )

    return (
      <Popover
        key={i}
        content={popContent}
        trigger="click"
        visible={visible}
        popupAlign={{ offset: [0, 15] }}
        onVisibleChange={handleVisibleChange}
      >
        <div
          style={{
            height: '35px',
            borderTop: '1px dashed #666',
            borderCollapse: 'collapse',
            ...paddingTop,
            ...paddingBot,
          }}
        >
          {hasEvent ? (
            <div
              style={{
                background: '#9a77cf',
                marginLeft: '2px',
                marginRight: '2px',
                height: '100%',
                ...styleTop,
                ...styleBot,
              }}
            >
              {first ? hasEvent.name : ''}
            </div>
          ) : (
            ''
          )}
        </div>
      </Popover>
    )
  })
  return <div style={{ border: '1px solid #666' }}>{slots}</div>
}
DayTimeSlots.propTypes = {
  day: PropTypes.object,
  events: PropTypes.array,
  addEvent: PropTypes.func,
  patients: PropTypes.array,
}

const Day = ({ day, events, addEvent, patients }) => {
  return (
    <div>
      <DayHeader day={day} />
      <DayTimeSlots day={day} events={events} addEvent={addEvent} patients={patients} />
    </div>
  )
}
Day.propTypes = {
  day: PropTypes.object,
  events: PropTypes.array,
  addEvent: PropTypes.func,
  patients: PropTypes.array,
}

const WeekDays = ({ days, events, addEvent, patients }) => {
  return days.map((day, i) => (
    <Col flex="auto" key={i} style={{ padding: '3px' }}>
      <Day day={day} events={events} addEvent={addEvent} patients={patients} />
    </Col>
  ))
}
WeekDays.propTypes = {
  days: PropTypes.array,
  addEvent: PropTypes.func,
}

const Labels = () => {
  const startTime = moment().hour(0).minutes(0).seconds(0)
  const times = Array(25)
    .fill(0)
    .map(() => ({ startTime: startTime.add(1, 'second').clone(), endTime: startTime.add(3599, 'seconds').clone() }))
  const labels = times.map((slot, i) => (
    <div key={i} style={style.labelSlot}>
      {slot.startTime.format('LT')}
    </div>
  ))
  return <div style={style.labelContainer}>{labels}</div>
}

export const WeeklySchedule = ({ week, events = [], next, prev, patients, addEvent }) => {
  const [weekDays, setWeekDays] = useState([])
  useEffect(() => {
    setWeekDays(getWeekDays(week))
  }, [week])

  return (
    <div style={style.schedule}>
      <div style={style.actions}>
        <Button onClick={prev} type="text">
          <LeftOutlined />
          SETTIMANA PRECEDENTE
        </Button>
        <Button onClick={next} type="text">
          {' '}
          SETTIMANA SUCCESSIVA
          <RightOutlined />
        </Button>
      </div>
      <div style={style.calendar}>
        <Labels />
        <WeekDays days={weekDays} events={events} patients={patients} addEvent={addEvent} />
      </div>
    </div>
  )
}
WeeklySchedule.propTypes = {
  week: PropTypes.number,
  events: PropTypes.array,
  next: PropTypes.func,
  prev: PropTypes.func,
  patients: PropTypes.array,
  addEvent: PropTypes.func,
}

const style = {
  schedule: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  calendar: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  labelContainer: {
    paddingTop: '40px',
    fontSize: '13px',
    color: '#666',
  },
  labelSlot: {
    height: '35px',
  },
  timeSlot: {
    height: '35px',
    borderTop: '1px dashed #666',
  },
}
