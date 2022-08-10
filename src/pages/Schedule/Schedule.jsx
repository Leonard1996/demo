import React, { useEffect, useState } from 'react'
import './style.css'
import { HeaderMenu, SideMenu, WeeklySchedule } from '../../modules'
import { Layout, message } from 'antd'
import { Content } from 'antd/es/layout/layout'
import moment from 'moment'
import { createSession, getPatients, getSessions } from '../../services'

export const Schedule = () => {
  const [week, setWeek] = useState(moment().week())
  const [events, setEvents] = useState([])
  const [patients, setPatients] = useState([])
  useEffect(() => {
    getPatients().then(d => setPatients(d.data))
  }, [])
  useEffect(() => {
    getSessions(moment().week(week).month() + 1).then(d => setEvents(d))
  }, [week])
  const next = () => setWeek(week + 1)
  const prev = () => setWeek(week - 1)
  const addEvent = async value => {
    let hasCollision = false
    const otherEvents = events.filter(ev => ev.id !== value.id)
    // moment(eStart) < moment(sEnd) && moment(eEnd) > moment(sStart)
    otherEvents.forEach(ev => {
      if (value.startTime < ev.endTime && value.endTime > ev.startTime) {
        hasCollision = true
      }
    })
    if (hasCollision) {
      return message.error('Event collision')
    }
    const { error, msg } = await createSession(value)
    if (error) {
      return message.error(msg)
    }
    message.success(msg)
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="schedule" style={{ paddingTop: '55px', paddingLeft: '150px', paddingRight: '150px' }}>
          <WeeklySchedule week={week} events={events} next={next} prev={prev} patients={patients} addEvent={addEvent} />
        </Content>
      </Layout>
    </Layout>
  )
}
