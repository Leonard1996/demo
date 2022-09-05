import { Avatar } from 'antd'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import TextArea from 'antd/es/input/TextArea'

const conv = [
  {
    sender: 1,
    text: 'I more dokumentat?',
    date: Date.now(),
  },
  {
    sender: 2,
    text: 'Po iki ne shtepi',
    date: new Date('2022-09-05T20:32:00'),
  },
  {
    sender: 1,
    text: 'Sapo arritem',
    date: new Date('2022-09-06T10:22:00'),
  },
  {
    sender: 1,
    text: 'I more dokumentat?',
    date: Date.now(),
  },
  {
    sender: 2,
    text: 'Po iki ne shtepi',
    date: new Date('2022-09-05T20:32:00'),
  },
  {
    sender: 1,
    text: 'Sapo arritem',
    date: new Date('2022-09-06T10:22:00'),
  },
  {
    sender: 1,
    text: 'I more dokumentat?',
    date: Date.now(),
  },
  {
    sender: 2,
    text: 'Po iki ne shtepi',
    date: new Date('2022-09-05T20:32:00'),
  },
  {
    sender: 1,
    text: 'Sapo arritem',
    date: new Date('2022-09-06T10:22:00'),
  },
  {
    sender: 1,
    text: 'I more dokumentat?',
    date: Date.now(),
  },
  {
    sender: 2,
    text: 'Po iki ne shtepi',
    date: new Date('2022-09-05T20:32:00'),
  },
  {
    sender: 1,
    text: 'Sapo arritem',
    date: new Date('2022-09-06T10:22:00'),
  },
]

const ConversationHeader = ({ contact }) => {
  if (!contact) return
  const initials = contact.name
    .split(' ')
    .map(s => s[0])
    .join('')
  return (
    <div className="conversationHeader">
      <Avatar>{initials}</Avatar>
      {contact.name}
    </div>
  )
}
ConversationHeader.propTypes = {
  contact: PropTypes.object,
}

const MessagesList = () => {
  return conv.map((msg, i) => <Message key={i} msg={msg} />)
}

const Message = ({ msg }) => {
  const { sender, text, date } = msg
  const type = sender === 1 ? 'sent' : 'received'
  return (
    <div style={{ display: 'flex' }}>
      <div className={'message ' + type}>
        <div>{text}</div>
        <div style={{ fontSize: '11px', float: 'right', color: '#666' }}>{moment(date).format('LT')}</div>
      </div>
    </div>
  )
}
Message.propTypes = {
  msg: PropTypes.object,
}

const NewMessage = () => {
  return (
    <div className="newMessage">
      <TextArea
        placeholder="Type a message"
        autoSize={{
          minRows: 1,
          maxRows: 4,
        }}
      />
    </div>
  )
}

export const ChatConversation = ({ contact }) => {
  if (!contact) return 'Select a contact'
  return (
    <div>
      <ConversationHeader contact={contact} />
      <div className="messages">
        <MessagesList />
      </div>
      <NewMessage />
    </div>
  )
}
ChatConversation.propTypes = {
  contact: PropTypes.object,
}
