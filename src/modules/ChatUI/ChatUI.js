import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { ChatConversation } from './ChatConversation'

import './style.css'

export const ChatUI = () => {
  const [selectedContact, setSelectedContact] = useState()
  return (
    <Row className="chat">
      <Col span={8} className="chatList" style={{ textAlign: 'start' }}>
        <ChatList selectContact={setSelectedContact} />
      </Col>
      <Col span={16} className="chatConversation" style={{ textAlign: 'start' }}>
        <ChatConversation contact={selectedContact} />
      </Col>
    </Row>
  )
}
