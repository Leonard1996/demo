import { Avatar } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import TextArea from 'antd/es/input/TextArea'
import { SocketContext } from '../../pages'
import { getUser } from '../../shared/utils'
import { CheckCircleTwoTone } from '@ant-design/icons'

const ConversationHeader = () => {
  const { selectedContact } = useContext(SocketContext)
  if (!selectedContact) return
  const initials = selectedContact.name?.[0] + selectedContact.lastName?.[0]
  return (
    <div className="conversationHeader">
      <Avatar>{initials}</Avatar>
      {selectedContact.name + ' ' + selectedContact.lastName}
    </div>
  )
}

const MessagesList = () => {
  const { messages } = useContext(SocketContext)
  const bottomRef = useRef(null)
  const list = messages.map((msg, i) => <Message key={i} msg={msg} />)
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <div className="messages">
      {list}
      <div ref={bottomRef} />
    </div>
  )
}

const Message = ({ msg }) => {
  const { id } = getUser()
  const { receiver, value, date, seen = 0 } = msg
  const type = id === receiver ? 'received' : 'sent'
  // const sent = id !== receiver ? <CheckOutlined /> : ''
  const sent = id !== receiver && seen ? <CheckCircleTwoTone /> : ''
  return (
    <div style={{ display: 'flex' }}>
      <div className={'message ' + type}>
        <div>{value}</div>
        <div style={{ fontSize: '11px', float: 'right', color: '#666' }}>
          {moment(date).format('LT')}
          <span style={{ marginLeft: '4px' }}>{sent}</span>
        </div>
      </div>
    </div>
  )
}
Message.propTypes = {
  msg: PropTypes.object,
}

const NewMessage = () => {
  const { sendMessage } = useContext(SocketContext)
  const [text, setText] = useState('')
  const send = () => {
    sendMessage(text)
    setTimeout(() => setText(''), 0)
  }
  return (
    <div className="newMessage">
      <TextArea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message"
        onPressEnter={send}
        autoSize={{
          minRows: 1,
          maxRows: 4,
        }}
      />
    </div>
  )
}
NewMessage.propTypes = {
  contact: PropTypes.object,
}

export const ChatConversation = () => {
  const { selectedContact } = useContext(SocketContext)
  if (!selectedContact) return 'Select a contact'
  return (
    <div>
      <ConversationHeader />
      <MessagesList />
      <NewMessage />
    </div>
  )
}
ChatConversation.propTypes = {
  contact: PropTypes.object,
}
