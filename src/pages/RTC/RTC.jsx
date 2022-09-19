import React from 'react'
import './style.css'
import { HeaderMenu, SideMenu } from '../../modules'
import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import { getUser } from '../../shared/utils'

export const RTC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  if (!state?.RTCToken) return navigate('/')
  const { RTCToken } = state
  console.log(state, RTCToken)
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="rtc">
          <Row style={{ paddingTop: '55px', paddingLeft: '100px', height: '100%' }}>
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/*<div>*/}
              {/*<h1 className="heading">Agora RTC NG SDK React Wrapper</h1>*/}
              <AgoraVideo RTCToken={RTCToken} />
              {/*</div>*/}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

const AgoraVideo = ({ RTCToken }) => {
  const navigate = useNavigate()
  // const [videoCall, setVideoCall] = useState(true)
  const rtcProps = {
    appId: 'c79b07fb26554e3bbf457935c0e6f21a',
    channel: 'psiqo', // your agora channel
    token: RTCToken, // use null or skip if using app in testing mode
    layout: layout.grid,
  }
  const callbacks = {
    EndCall: () => {
      // setVideoCall(false)
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
}
