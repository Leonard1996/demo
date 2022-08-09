import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'antd/es/layout/layout'
import Logo from '../../assets/icons/Logo'

import './style.css'
import { isLoggedIn } from '../../shared/utils'
import { LoggedMenu } from '../Menu/LoggedMenu'
import { LandingMenu } from '../LandingMenu/LandingMenu'

export const HeaderMenu = () => {
  const [scroll, setScroll] = useState(0)
  const menu = isLoggedIn() ? <LoggedMenu /> : <LandingMenu />
  window.addEventListener('scroll', () => {
    setScroll(window.scrollY)
  })
  return (
    <Header className={'headerMenu ' + (scroll > 10 ? 'colored' : '')}>
      <Link to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Logo width="200" height="90" fill="white" />
      </Link>
      {menu}
    </Header>
  )
}
