import { Layout } from 'antd'
import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { ChatUI, HeaderMenu, SideMenu } from '../../modules'

import './style.css'

export const Chat = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content style={{ paddingTop: '55px', paddingLeft: '150px', paddingBottom: '20px' }}>
          <ChatUI />
        </Content>
      </Layout>
    </Layout>
  )
}
