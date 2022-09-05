import { Avatar, Col, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Search from 'antd/es/input/Search'

const history = [
  {
    name: 'Eri Dervishi',
    lastMsg: 'I more dokumentat?',
    date: Date.now(),
  },
  {
    name: 'Elsiona Dervishi',
    lastMsg: 'Po iki ne shtepi',
    date: new Date('2022-09-05T20:32:00'),
  },
  {
    name: 'Derald Shehi',
    lastMsg: 'Sapo arritem',
    date: new Date('2022-09-06T10:22:00'),
  },
]

const Chat = ({ chat }) => {
  const { name, lastMsg, date } = chat
  return (
    <Row>
      <Col>
        <div>{name}</div>
        <div>{lastMsg}</div>
        <div>{moment(date).format('LLL')}</div>
      </Col>
    </Row>
  )
}

Chat.propTypes = {
  chat: PropTypes.object,
}

export const ChatList = ({ selectContact }) => {
  // return history.map((chat, i) => <Chat key={i} chat={chat} />)
  const [list, setList] = useState(history)
  useEffect(() => {
    // setDisplayList(patients)
  }, [])
  const onSearch = q => {
    if (!q) return setList(history)
    setList(history.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase())))
  }
  const header = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Search
        onChange={e => onSearch(e.target.value)}
        placeholder="Cerca"
        style={{ width: '100%', marginLeft: '10px' }}
      />
    </div>
  )
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      header={header}
      renderItem={item => {
        const initials = item.name
          .split(' ')
          .map(s => s[0])
          .join('')
        return (
          <List.Item onClick={() => selectContact(item)} extra={moment(item.date).format('L')}>
            <List.Item.Meta avatar={<Avatar>{initials}</Avatar>} title={item.name} description={item.lastMsg} />
          </List.Item>
        )
      }}
    />
  )
}

ChatList.propTypes = {
  selectContact: PropTypes.func,
}
