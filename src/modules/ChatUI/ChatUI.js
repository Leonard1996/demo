import { Col, Row } from 'antd'
import React from 'react'
import { ChatList } from './ChatList'
import { ChatConversation } from './ChatConversation'

import './style.css'

export const ChatUI = () => {
  return (
    <Row className="chat">
      <Col span={8} className="chatList" style={{ textAlign: 'start' }}>
        <ChatList />
      </Col>
      <Col span={16} className="chatConversation" style={{ textAlign: 'start' }}>
        <ChatConversation />
      </Col>
    </Row>
  )
}
