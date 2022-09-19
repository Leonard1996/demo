import React, { useEffect, useState } from 'react'
import './style.css'
import { Button, Col, Layout, Row } from 'antd'
import { HeaderMenu, NextSession, SideMenu } from '../../modules'
import { getNextSession, confirmSession, getRtcToken } from '../../services'
import { getUser } from '../../shared/utils'
import { BuyOptions } from '../../modules/BuyOptions/BuyOptions'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const [nextSession, setNextSession] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    getNextSession().then(d => setNextSession(d))
  }, [])
  const user = getUser()
  const description = +user.credit
    ? 'Acquista nuovi crediti per le tue prossime sedute!'
    : "I tuoi crediti non sono sufficienti per confermare la tua prossima seduta. Seleziona il servizio e procedi all'acquisto per confermare."

  const confirm = async () => {
    await confirmSession(nextSession.id)
    getNextSession().then(d => setNextSession(d))
  }

  const openRTC = async () => {
    const RTCToken = await getRtcToken(nextSession)
    if (RTCToken) navigate('/rtc', { state: { RTCToken } })
  }

  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="dashboard">
          <Row style={{ paddingTop: '150px', paddingLeft: '250px', textAlign: 'start' }} align="middle">
            <Col flex="640px">
              {nextSession && (
                <NextSession style={{ textAlign: 'start' }} session={nextSession} confirm={confirm} openRTC={openRTC} />
              )}
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
