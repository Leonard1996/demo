import React, { useEffect, useState } from 'react'
import './style.css'
import { HeaderMenu, SideMenu } from '../../modules'
import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'

import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'

const config = { mode: 'rtc', codec: 'vp8' }

const useClient = createClient(config)
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()

const appId = 'c79b07fb26554e3bbf457935c0e6f21a' //ENTER APP ID HERE
const token =
  '006c79b07fb26554e3bbf457935c0e6f21aIABmuQ5L5BgccrBdQ2sJQ4bEBVN6a6qxa/k3O73PtzGsC3HcVeoAAAAAIgCGjS05lkIjYwQAAQAm/yFjAgAm/yFjAwAm/yFjBAAm/yFj'

export const RTC = () => {
  const [inCall, setInCall] = useState(false)
  const [channelName, setChannelName] = useState('psiqo')
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="report">
          <Row style={{ paddingTop: '55px', paddingLeft: '100px' }}>
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
                {inCall ? (
                  <VideoCall setInCall={setInCall} channelName={channelName} />
                ) : (
                  <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

const VideoCall = props => {
  // eslint-disable-next-line react/prop-types
  const { setInCall, channelName } = props
  const [users, setUsers] = useState([])
  const [start, setStart] = useState(false)
  // using the hook to get access to the client object
  const client = useClient()
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks()

  useEffect(() => {
    // function to initialise the SDK
    let init = async name => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        console.log('subscribe success')
        if (mediaType === 'video') {
          setUsers(prevUsers => {
            return [...prevUsers, user]
          })
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play()
        }
      })

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type)
        if (type === 'audio') {
          user.audioTrack?.stop()
        }
        if (type === 'video') {
          setUsers(prevUsers => {
            return prevUsers.filter(User => User.uid !== user.uid)
          })
        }
      })

      client.on('user-left', user => {
        console.log('leaving', user)
        setUsers(prevUsers => {
          return prevUsers.filter(User => User.uid !== user.uid)
        })
      })

      await client.join(appId, name, token, null)
      if (tracks) await client.publish([tracks[0], tracks[1]])
      setStart(true)
    }

    if (ready && tracks) {
      console.log('init ready')
      init(channelName)
    }
  }, [channelName, client, ready, tracks])

  return (
    <div className="App">
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  )
}

const Videos = props => {
  // eslint-disable-next-line react/prop-types
  const { users, tracks } = props

  return (
    <div>
      <div id="videos">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className="vid" videoTrack={tracks[1]} />
        {/* eslint-disable-next-line react/prop-types */}
        {users.length > 0 &&
          // eslint-disable-next-line react/prop-types
          users.map(user => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: '95%', width: '95%' }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              )
            } else return null
          })}
      </div>
    </div>
  )
}

export const Controls = props => {
  const client = useClient()
  // eslint-disable-next-line react/prop-types
  const { tracks, setStart, setInCall } = props
  const [trackState, setTrackState] = useState({ video: true, audio: true })

  const mute = async type => {
    if (type === 'audio') {
      // eslint-disable-next-line react/prop-types
      await tracks[0].setEnabled(!trackState.audio)
      setTrackState(ps => {
        return { ...ps, audio: !ps.audio }
      })
    } else if (type === 'video') {
      // eslint-disable-next-line react/prop-types
      await tracks[1].setEnabled(!trackState.video)
      setTrackState(ps => {
        return { ...ps, video: !ps.video }
      })
    }
  }

  const leaveChannel = async () => {
    await client.leave()
    client.removeAllListeners()
    // we close the tracks to perform cleanup
    // eslint-disable-next-line react/prop-types
    tracks[0].close()
    // eslint-disable-next-line react/prop-types
    tracks[1].close()
    setStart(false)
    setInCall(false)
  }

  return (
    <div className="controls">
      <p className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
        {trackState.audio ? 'MuteAudio' : 'UnmuteAudio'}
      </p>
      <p className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
        {trackState.video ? 'MuteVideo' : 'UnmuteVideo'}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  )
}

const ChannelForm = props => {
  // eslint-disable-next-line react/prop-types
  const { setInCall, setChannelName } = props

  return (
    <form className="join">
      {appId === '' && <p style={{ color: 'red' }}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text" placeholder="Enter Channel Name" onChange={e => setChannelName(e.target.value)} />
      <button
        onClick={e => {
          e.preventDefault()
          setInCall(true)
        }}
      >
        Join
      </button>
    </form>
  )
}
