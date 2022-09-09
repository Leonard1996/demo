import { Layout } from 'antd'
import React, { createContext, useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { ChatUI, HeaderMenu, SideMenu } from '../../modules'
import io from 'socket.io-client'
import './style.css'
import { getToken, getUser } from '../../shared/utils'
import { getMyTherapist, getPatients } from '../../services'
import axios from 'axios'

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
    const getContacts = async () => {
      const contacts =
        user.role === 'patient'
          ? await getMyTherapist().then(d => [d.data || {}])
          : await getPatients().then(d => d.data)
      setContacts(contacts)
      for (const contact of contacts) {
        const room = user.role === 'patient' ? `${user.id}-${contact.id}` : `${contact.id}-${user.id}`
        contact.lastMsg = await axios(`http://localhost:4999/history?room=${room}`).then(r => r.data || {})
      }
    }

    getContacts().catch(e => console.error(e))

    socket = io('http://localhost:4999', {
      extraHeaders: {
        Authorization: getToken(),
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
      delete messages.latest
      setMessagesList(
        Object.values(messages).sort((firstMessage, secondMessage) => firstMessage.date - secondMessage.date),
      )
    })
    socket.on('newMessage', message => {
      setMessagesList([...messagesList, message])

      // const contactId = user.role === 'patient' ? `${user.id}-${contact.id}` : `${contact.id}-${user.id}`
      const contactId = user.role === 'patient' ? room.split('-')[1] : room.split('-')[0]
      const contact = contacts.filter(({ id }) => +id === +contactId)
      if (!contact[0]) return
      contact[0].lastMsg = message
      setContacts(contacts)
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
