import { Avatar, Col, List, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Search from 'antd/es/input/Search'
import { SocketContext } from '../../pages'
import { getUser } from '../../shared/utils'

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

export const ChatList = () => {
  const user = getUser()
  const { contacts, setSelectedContact } = useContext(SocketContext)
  const [list, setList] = useState(contacts)
  useEffect(() => {
    setList(contacts)
  }, [contacts])
  const onSearch = q => {
    if (!q) return setList(contacts)
    setList(contacts.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase())))
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
        const initials = item.name[0] + item.lastName[0]
        const prefix = item.lastMsg ? (+item.lastMsg.receiver !== +user.id ? 'You: ' : '') : ''
        return (
          <List.Item onClick={() => setSelectedContact(item)} extra={moment(item.lastMsg?.date).format('LT')}>
            <List.Item.Meta
              avatar={<Avatar>{initials}</Avatar>}
              title={item.name + ' ' + item.lastName}
              description={prefix + (item.lastMsg?.value || '')}
            />
          </List.Item>
        )
      }}
    />
  )
}
