import { Layout } from 'antd'
import React, { createContext, useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { ChatUI, HeaderMenu, SideMenu } from '../../modules'
import io from 'socket.io-client'
import './style.css'
import { getToken, getUser, ROLES } from '../../shared/utils'
import { getAllUsers, getMyTherapist, getPatients } from '../../services'
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
    console.log(msg)
    socket.emit('createMessage', msg)
  }

  const clearSeenStatus = messages => {
    let seen = false
    messages.reverse().forEach(msg => {
      if (seen) return delete msg.seen
      if (msg.seen) seen = true
    })
    return messages.reverse()
  }

  useEffect(() => {
    const getContacts = async () => {
      let contacts = []
      if (user.role === ROLES.PATIENT) contacts = await getMyTherapist().then(d => [d.data] || [])
      else if (user.role === ROLES.DOCTOR) contacts = await getPatients().then(d => d.data)
      else contacts = await getAllUsers().then(d => d.data)
      for (const contact of contacts) {
        const room = user.role === ROLES.PATIENT ? `${user.id}-${contact.id}` : `${contact.id}-${user.id}`
        contact.lastMsg = await axios(`${process.env.REACT_APP_CHAT_URL}/history?room=${room}`).then(r => r.data)
      }
      setContacts(contacts)
    }

    getContacts().catch(e => console.error(e))

    socket = io(process.env.REACT_APP_CHAT_URL, {
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
    const room = user.role === ROLES.PATIENT ? `${user.id}-${selectedContact.id}` : `${selectedContact.id}-${user.id}`
    socket.emit('create', room)
    socket.on('roomCreated', () => {
      socket.emit('requestHistory', selectedContact.id)
    })
    socket.on('loadHistory', messages => {
      delete messages.latest
      let mList = Object.values(messages).sort((firstMessage, secondMessage) => firstMessage.date - secondMessage.date)
      mList = clearSeenStatus(mList)
      setMessagesList(mList)
    })
    socket.on('newMessage', message => {
      console.log(message)
      setMessagesList(messagesList => [...messagesList, message])
      const contactId = user.role === ROLES.PATIENT ? room.split('-')[1] : room.split('-')[0]
      const contact = contacts.filter(({ id }) => +id === +contactId)
      if (!contact[0]) return
      contact[0].lastMsg = message
      setContacts(contacts)

      if (user.id === message.receiver) socket.emit('seen', { ...message, seen: 1 })
    })
    socket.on('notifySeen', message => {
      setMessagesList(messagesList => {
        messagesList.forEach(msg => {
          if (msg.date === message.date) msg.seen = 1
        })
        const mList = clearSeenStatus(messagesList)
        return [...mList]
      })
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
