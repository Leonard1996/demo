import React, { useEffect, useState } from 'react'
import './style.css'
import { HeaderMenu, SideMenu } from '../../modules'
import { Button, Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { getAllSessions } from '../../services'
import moment from 'moment'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const MonthsList = ({ sessions }) =>
  sessions.map(({ name, done = '-', unConfirmed = '-' }) => (
    <Col key={name} span={8} style={{ textTransform: 'uppercase', textAlign: 'start' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{name}</div>
      <div>Sedute fatte: {done}</div>
      <div style={{ marginBottom: '25px' }}>Sedute non confermate: {unConfirmed}</div>
    </Col>
  ))

export const Report = () => {
  const [year, setYear] = useState(moment().year())
  const [sessions, setSessions] = useState([])
  useEffect(() => {
    getAllSessions(year).then(d => setSessions(d))
  }, [year])
  const next = () => setYear(year + 1)
  const prev = () => setYear(year - 1)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="report">
          <Row style={{ paddingTop: '55px', paddingLeft: '100px' }}>
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={prev} type="text">
                <LeftOutlined />
                ANNO PRECEDENTE
              </Button>
              <Button onClick={next} type="text">
                {' '}
                ANNO SUCCESSIVO
                <RightOutlined />
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: '55px', paddingLeft: '100px', justifyContent: 'space-between' }}>
            <MonthsList sessions={sessions} />
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
