import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'antd/es/layout/layout'
import Logo from '../../assets/icons/Logo'
import { Button, Row } from 'antd'

import './style.css'

const menuList = [
  { name: 'Come Funziona' },
  { name: 'Lavora con noi', path: '/registerth' },
  { name: 'Chi siamo' },
  { name: 'Accedi', type: 'link', path: '/login' },
  { name: 'Inizia Adesso', type: 'primary' },
]

const MenuList = () => {
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

const LandingMenu = () => {
  return (
    <Header className="landingMenu">
      <Link to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Logo width="200" height="90" fill="white" />
      </Link>
      <MenuList />
    </Header>
  )
}

export default LandingMenu
