import React, { useEffect, useState } from 'react'
import './style.css'
import { HeaderMenu, SideMenu } from '../../modules'
import { Button, Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'
// import {getAllSessions} from "../../services";

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
    <div key={i} style={{ height: '35px', borderTop: '1px dashed #666', borderCollapse: 'collapse' }} />
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
    <Col flex="auto" key={i} style={{ padding: '3px' }}>
      <Day day={day} />
    </Col>
  ))
}
WeekDays.propTypes = {
  days: PropTypes.array,
}

export const Schedule = () => {
  const [week, setWeek] = useState(moment().week())
  const [weekDays, setWeekDays] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    setWeekDays(getWeekDays(week))
    setEvents([])
    // getAllSessions(year).then(d => setSessions(d))
  }, [week])
  console.log(events, week)
  console.log(weekDays)
  const next = () => setWeek(week + 1)
  const prev = () => setWeek(week - 1)
  const startTime = moment().hour(9).minutes(0).seconds(0)
  const times = Array(17)
    .fill(0)
    .map(() => ({ startTime: startTime.add(1, 'second').clone(), endTime: startTime.add(1799, 'seconds').clone() }))
  const labels = times.map((slot, i) => (
    <div key={i} style={{ height: '35px' }}>
      {slot.startTime.format('LT')}
    </div>
  ))
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="schedule" style={{ paddingTop: '55px', paddingLeft: '150px', paddingRight: '150px' }}>
          <Row>
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={prev} type="text">
                <LeftOutlined />
                SETTIMANA PRECEDENTE
              </Button>
              <Button onClick={next} type="text">
                {' '}
                SETTIMANA SUCCESSIVO
                <RightOutlined />
              </Button>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'space-between' }}>
            <Col span={1} style={{ paddingTop: '40px', fontSize: '13px', color: '#666' }}>
              {labels}
            </Col>
            <WeekDays days={weekDays} />
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
