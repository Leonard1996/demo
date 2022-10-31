import React from 'react'
import './style.css'
import { Layout, Row, Col, Image, Button } from 'antd'
import { HeaderMenu } from '../../modules'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'

export const Landing = () => {
  const { Content } = Layout
  return (
    <Layout style={{ height: '100vh' }} className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row style={{ height: '800px' }}>
          <Col flex="auto" style={{ display: 'flex' }}>
            <div className="landingMain">
              <Image src="https://psiqo-fe-images.s3.eu-central-1.amazonaws.com/white-logo.png" preview={false} />
              <div style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '20px' }}>Passa alla terapia online!</div>
              <div style={{ fontSize: '25px' }}>
                Raggiungi il tuo benessere mentale, con PSIQO: il servizio di consulenza psicologica 100% online, che ti
                supporta quando e da dove vuoi. Compila il questionario e prenota il tuo primo colloquio gratuito!
              </div>
              <Button type="primary" href="/register" size="large" shape="round" style={{ textDecoration: 'none' }}>
                INIZIA ADESSO
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
