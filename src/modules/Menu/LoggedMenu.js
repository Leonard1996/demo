import React from 'react'
import { Button, Row } from 'antd'

import './style.css'
import { getUser, logout } from '../../shared/utils'

export const LoggedMenu = () => {
  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  }
  const { name, lastName } = getUser() || {}
  return (
    <Row style={menuStyle}>
      <Button type="link" style={{ textDecoration: 'none' }}>
        CIAO, {name} {lastName}
      </Button>
      <Button
        onClick={logout}
        type="text"
        href="/"
        style={{ textDecoration: 'none', position: 'absolute', right: '25px' }}
      >
        ESCI
      </Button>
    </Row>
  )
}
