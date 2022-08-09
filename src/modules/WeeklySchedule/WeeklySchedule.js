import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Col } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const getWeekDays = week => {
  const startDay = moment().week(week).startOf('week')
  let date = startDay.clone().subtract(1, 'day')
  return Array(7)
    .fill(0)
    .map(() => date.add(1, 'day').clone())
}

const DayHeader = ({ day }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ fontSize: '50px', display: 'flex', alignItems: 'center', height: '45px' }}>
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

const DayTimeSlots = () => {
  const startTime = moment().hour(9).minutes(0).seconds(0)
  const times = Array(16)
    .fill(0)
    .map(() => ({ startTime: startTime.add(1, 'second').clone(), endTime: startTime.add(1799, 'seconds').clone() }))
  const slots = times.map((_s, i) => (
    <div key={i} style={{ ...style.timeSlot, ...(i === 0 ? { borderTop: '0' } : {}) }} />
  ))
  return <div style={{ border: '1px solid #666' }}>{slots}</div>
}

const Day = ({ day }) => {
  return (
    <div>
      <DayHeader day={day} />
      <DayTimeSlots />
    </div>
  )
}
Day.propTypes = {
  day: PropTypes.object,
}

const WeekDays = ({ days }) => {
  return days.map((day, i) => (
    <Col key={i} style={{ padding: '3px', flex: 1 }}>
      <Day day={day} />
    </Col>
  ))
}
WeekDays.propTypes = {
  days: PropTypes.array,
}

const Labels = () => {
  const startTime = moment().hour(9).minutes(0).seconds(0)
  const times = Array(17)
    .fill(0)
    .map(() => ({ startTime: startTime.add(1, 'second').clone(), endTime: startTime.add(1799, 'seconds').clone() }))
  const labels = times.map((slot, i) => (
    <div key={i} style={style.labelSlot}>
      {slot.startTime.format('LT')}
    </div>
  ))
  return <div style={style.labelContainer}>{labels}</div>
}

export const WeeklySchedule = ({ week, events, next, prev }) => {
  console.log(events)
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
          SETTIMANA SUCCESSIVO
          <RightOutlined />
        </Button>
      </div>
      <div style={style.calendar}>
        <Labels />
        <WeekDays days={weekDays} />
      </div>
    </div>
  )
}
WeeklySchedule.propTypes = {
  week: PropTypes.number,
  events: PropTypes.array,
  next: PropTypes.func,
  prev: PropTypes.func,
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
