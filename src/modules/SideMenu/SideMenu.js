import React from 'react'
import Sider from 'antd/es/layout/Sider'

import './style.css'
import { Button } from 'antd'
import { useLocation } from 'react-router-dom'

const items = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Il mio terapeuta', path: '/my-therapist' },
  { name: 'Informazioni personali', type: 'label', path: '/my-therapist' },
  { name: 'Il mio profilo', path: '/me' },
  { name: 'Le mie fatture', path: '/my-orders' },
  { name: 'Conseso Informato', path: '/consent' },
  { name: 'Modifica password', path: '/change-password' },
  { name: 'Contatta il team PSIQO', type: 'label', path: '/my-therapist' },
]

export const SideMenu = () => {
  const location = useLocation()
  const list = items.map(({ name, path, type = 'item' }, i) => (
    <Button className={type + '' + (location.pathname === path ? ' selected' : '')} key={i} type="text" href={path}>
      {name}
    </Button>
  ))
  return <Sider className="side-menu">{list}</Sider>
}
