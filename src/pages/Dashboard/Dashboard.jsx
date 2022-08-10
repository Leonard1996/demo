import React, { useEffect, useState } from 'react'
import './style.css'
import { Button, Col, Layout, Row } from 'antd'
import { HeaderMenu, NextSession, SideMenu } from '../../modules'
import { getNextSession } from '../../services'
import { getUser } from '../../shared/utils'
import { BuyOptions } from '../../modules/BuyOptions/BuyOptions'
// import { Footer, Header } from 'antd/es/layout/layout'
// import Sider from 'antd/es/layout/Sider'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

export const Dashboard = () => {
  const [nextSession, setNextSession] = useState()
  useEffect(() => {
    getNextSession().then(d => setNextSession(d))
  }, [])
  const user = getUser()
  const description = +user.credit
    ? 'Acquista nuovi crediti per le tue prossime sedute!'
    : "I tuoi crediti non sono sufficienti per confermare la tua prossima seduta. Seleziona il servizio e procedi all'acquisto per confermare."

  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Row style={{ paddingTop: '150px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">
              {nextSession && <NextSession style={{ textAlign: 'start' }} session={nextSession} />}
            </Col>
          </Row>
          <Row style={{ paddingTop: '50px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">
              <div>CREDITI DISPONIBILI: {user.credit}</div>
            </Col>
          </Row>
          <Row style={{ paddingTop: '50px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">
              <Button disabled>CONFERMA</Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: '50px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">
              <p>{description}</p>
            </Col>
          </Row>
          <Row style={{ paddingTop: '50px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="700px">
              <BuyOptions />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
