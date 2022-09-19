import React from 'react'
import './style.css'
import { HeaderMenu, SideMenu } from '../../modules'
import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import { getUser } from '../../shared/utils'
import { doneSession } from '../../services'

export const RTC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  if (!state?.RTCToken) return navigate('/')
  const { RTCToken, sessionId } = state
  console.log(state, RTCToken)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="rtc">
          <Row style={{ paddingTop: '55px', paddingLeft: '100px', height: '100%' }}>
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AgoraVideo RTCToken={RTCToken} sessionId={sessionId} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

const AgoraVideo = ({ RTCToken, sessionId }) => {
  const navigate = useNavigate()
  const rtcProps = {
    appId: 'c79b07fb26554e3bbf457935c0e6f21a',
    channel: 'psiqo',
    token: RTCToken,
    layout: layout.grid,
  }
  const callbacks = {
    EndCall: async () => {
      if (sessionId) await doneSession(sessionId)
      navigate('/')
    },
  }
  const user = getUser()
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={{ username: user.name, displayUsername: true }} />
    </div>
  )
}

AgoraVideo.propTypes = {
  RTCToken: PropTypes.string,
  sessionId: Promise.any,
}
