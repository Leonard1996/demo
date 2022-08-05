import React from 'react'
import { Button, Row } from 'antd'

import './style.css'
import { getUser, logout } from '../../shared/utils'
import { useNavigate } from 'react-router-dom'

export const LoggedMenu = () => {
  const navigate = useNavigate()
  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  }
  const { name, lastName } = getUser() || {}

  const logoutAction = () => {
    logout()
    navigate('/')
  }

  return (
    <Row style={menuStyle}>
      <Button type="link" style={{ textDecoration: 'none' }}>
        CIAO, {name} {lastName}
      </Button>
      <Button
        onClick={logoutAction}
        type="text"
        href="/"
        style={{ textDecoration: 'none', position: 'absolute', right: '25px' }}
      >
        ESCI
      </Button>
    </Row>
  )
}
