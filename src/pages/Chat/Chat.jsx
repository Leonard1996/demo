import { Layout } from 'antd'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { ChatUI, HeaderMenu, SideMenu } from '../../modules'
import io from 'socket.io-client'
import './style.css'
import { getToken, getUser, ROLES } from '../../shared/utils'
import { getAdmins, getAllUsers, getMyTherapist, getPatients } from '../../services'
import axios from 'axios'

export const SocketContext = createContext({})
export const Chat = () => {
  const user = getUser()
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState()
  const [messagesList, setMessagesList] = useState([])

  const socketRef = useRef(null)

  const sendMessage = value => {
    if (!selectedContact) return
    const msg = {
      value,
      receiver: selectedContact.id,
    }
    socketRef.current.emit('createMessage', msg)
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
      if (user.role === ROLES.PATIENT) {
        const therapist = await getMyTherapist().then(d => d.data)
        const admins = await getAdmins()
        contacts = [...admins].concat(therapist ?? [])
      } else if (user.role === ROLES.DOCTOR) {
        const patients = await getPatients().then(d => d.data)
        const admins = await getAdmins()
        contacts = [...patients, ...admins]
      } else contacts = await getAllUsers().then(d => d.data)
      for (const contact of contacts) {
        const room = user.role === ROLES.DOCTOR ? `${contact.id}-${user.id}` : `${user.id}-${contact.id}`
        // eslint-disable-next-line no-undef
        contact.lastMsg = await axios(`${process.env.REACT_APP_CHAT_URL}/history?room=${room}`).then(r => r.data)
      }
      setContacts(contacts)
    }
    getContacts().catch(e => console.error(e))
  }, [])

  useEffect(() => {
    if (!selectedContact) return
    const room = user.role === ROLES.DOCTOR ? `${selectedContact.id}-${user.id}` : `${user.id}-${selectedContact.id}`
    // eslint-disable-next-line no-undef
    socketRef.current = io(process.env.REACT_APP_CHAT_URL, {
      extraHeaders: {
        Authorization: getToken(),
      },
    })
    socketRef.current.emit('create', room)
    socketRef.current.on('roomCreated', () => {
      socketRef.current.emit('requestHistory', selectedContact.id)
    })
    socketRef.current.on('newMessage', message => {
      setMessagesList(messagesList => [...messagesList, message])
      const contactId = user.role === ROLES.DOCTOR ? room.split('-')[0] : room.split('-')[1]
      const contact = contacts.filter(({ id }) => +id === +contactId)
      if (!contact[0]) return
      contact[0].lastMsg = message
      setContacts(contacts)
      if (user.id === message.receiver) socketRef.current.emit('seen', { ...message, seen: 1 })
    })
    socketRef.current.on('loadHistory', messages => {
      delete messages.latest
      let mList = Object.values(messages).sort((firstMessage, secondMessage) => firstMessage.date - secondMessage.date)
      mList = clearSeenStatus(mList)
      setMessagesList(mList)
    })
    socketRef.current.on('notifySeen', message => {
      setMessagesList(messagesList => {
        const foundMsg = messagesList.find(msg => msg.date === message.date)
        if (!foundMsg) return
        foundMsg.seen = 1
        const mList = clearSeenStatus(messagesList)
        return [...mList]
      })
    })
    return () => {
      socketRef.current.disconnect()
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
