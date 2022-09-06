import { Layout } from 'antd'
import React, { createContext, useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { ChatUI, HeaderMenu, SideMenu } from '../../modules'
import io from 'socket.io-client'
import './style.css'
import { getToken, getUser } from '../../shared/utils'
import { getMyTherapist, getPatients } from '../../services'

export const SocketContext = createContext({})

let socket
export const Chat = () => {
  const user = getUser()
  const [connected, setConnected] = useState(false)
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState()
  const [messagesList, setMessagesList] = useState([])

  const sendMessage = value => {
    if (!selectedContact) return
    const msg = {
      value,
      receiver: selectedContact.id,
    }
    socket.emit('createMessage', msg)
  }

  useEffect(() => {
    user.role === 'patient'
      ? getMyTherapist().then(d => setContacts([d.data || {}]))
      : getPatients().then(d => setContacts(d.data))
    socket = io('http://localhost:4999', {
      auth: {
        token: getToken(),
      },
    })
    socket.on('connect', () => {
      setConnected(true)
    })
    return () => {
      socket.off('connect')
    }
  }, [])

  useEffect(() => {
    if (!connected) return
    const room = user.role === 'patient' ? `${user.id}-${selectedContact.id}` : `${selectedContact.id}-${user.id}`
    socket.emit('create', room)
    socket.on('roomCreated', () => {
      socket.emit('requestHistory', selectedContact.id)
    })
    socket.on('loadHistory', messages => {
      console.log(messages)
      setMessagesList(
        Object.values(messages).sort((firstMessage, secondMessage) => firstMessage.date - secondMessage.date),
      )
    })
    socket.on('newMessage', function (message) {
      console.log(message)
      console.log(messagesList)
      const m = [...messagesList, message]
      setMessagesList(m)
    })
    return () => {
      socket.off('roomCreated')
      socket.off('loadHistory')
      socket.off('newMessage')
    }
  }, [selectedContact])
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content style={{ paddingTop: '55px', paddingLeft: '150px', paddingBottom: '20px' }}>
          <SocketContext.Provider
            value={{ sendMessage, setSelectedContact, messages: messagesList, contacts, selectedContact }}
          >
            <ChatUI />
          </SocketContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}
