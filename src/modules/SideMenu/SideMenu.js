import React from 'react'
import Sider from 'antd/es/layout/Sider'

import './style.css'
import { Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { getUser } from '../../shared/utils'

const items = {
  patient: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Il mio terapeuta', path: '/my-therapist' },
    { name: 'Informazioni personali', type: 'label' },
    { name: 'Il mio profilo', path: '/me' },
    { name: 'Le mie fatture', path: '/my-orders' },
    { name: 'Conseso Informato', path: '/consent' },
    { name: 'Modifica password', path: '/change-password' },
    { name: 'Contatta il team PSIQO', type: 'label' },
  ],
  doctor: [
    { name: 'Il mio calendario', path: '/schedule' },
    { name: 'Sedute fatte', path: '/reports' },
    { name: 'I miei pazienti', path: '/my-patients' },
    { name: 'Informazioni personali', type: 'label' },
    { name: 'La mia scheda', path: '/my-therapist' },
    { name: 'Modifica password', path: '/change-password' },
    { name: 'Contatta il team PSIQO', type: 'label' },
  ],
}

export const SideMenu = () => {
  const location = useLocation()
  const { role } = getUser()
  const list = items[role].map(({ name, path = '#', type = 'item' }, i) => (
    <Button className={type + '' + (location.pathname === path ? ' selected' : '')} key={i} type="text" href={path}>
      {name}
    </Button>
  ))
  return <Sider className="side-menu">{list}</Sider>
}
