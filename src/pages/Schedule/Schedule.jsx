import React, { useEffect, useState } from 'react'
import './style.css'
import { HeaderMenu, SideMenu, WeeklySchedule } from '../../modules'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import moment from 'moment'
import { getSessions } from '../../services'

export const Schedule = () => {
  const [week, setWeek] = useState(moment().week())
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents([])
    getSessions(moment().week(week).month() + 1).then(d => setEvents(d))
  }, [week])
  console.log(events, week)
  const next = () => setWeek(week + 1)
  const prev = () => setWeek(week - 1)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="schedule" style={{ paddingTop: '55px', paddingLeft: '150px', paddingRight: '150px' }}>
          <WeeklySchedule week={week} events={events} next={next} prev={prev} />
        </Content>
      </Layout>
    </Layout>
  )
}
