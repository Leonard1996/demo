import React from 'react'
import { Button, Row } from 'antd'

import './style.css'

const menuList = [
  { name: 'Come Funziona' },
  { name: 'Lavora con noi', path: '/registerth' },
  { name: 'Chi siamo' },
  { name: 'Accedi', type: 'link', path: '/login' },
  { name: 'Inizia Adesso', type: 'primary', path: '/register' },
]

export const LandingMenu = () => {
  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const mlist = menuList.map(({ name, type = 'text', path = '/' }, i) => {
    return (
      <Button key={i} type={type} href={path} style={{ textDecoration: 'none' }}>
        {name}
      </Button>
    )
  })
  return <Row style={menuStyle}>{mlist}</Row>
}
