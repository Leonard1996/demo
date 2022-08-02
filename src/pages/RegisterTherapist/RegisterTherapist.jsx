import React from 'react'
import './style.css'
import { Layout, Row, Col, Space } from 'antd'
// import { UserOutlined, LockOutlined, QuestionOutlined } from '@ant-design/icons'

// import CopyRight from '../../shared/components/CopyRight/CopyRight'
import { registerTherapist } from '../../services'
import { useNavigate } from 'react-router-dom'
import { HeaderMenu, RegisterTherapistForm } from '../../modules'

const IntroText = (
  <p>
    Entra nel team di PSIQO!
    <br />
    Sei una/o psicologa/o? Unisciti a noi! PSIQO è una nuova piattaforma 100% online, con l&apos;ambizioso obiettivo di
    <br />
    portare la terapia nelle case di tutti.
    <br />
    <br />
    Perché lavorare con noi:
    <br />
    Ci occupiamo di tutto noi, perché tu possa concentrarti solo su ciò che è importante: i tuoi pazienti e il to
    lavoro.
    <br />
    Gestiamo la tua agenda in base alle disponibilità che ci vorrai e potrai fornire. <br />
    Ti garantiamo una retribuzione fissa mensile, part time o full time, in base all&apos;impegno che potrai garantirci.
    <br />
    <br />
    Requisiti fondamentali: <br />
    P.Iva, iscrizione all&apos;ENPAP e all&apos;Ordine degli Psicologi. <br />
    Iscrizione almeno al 4° anno di scuola di specializzazione di Psicoterapia. <br />
    PC e connessione internet ben funzionanti e affidabili. <br />
    <br />
    INVIA LA TUA CANDIDATURA!
  </p>
)

export const RegisterTherapist = () => {
  const { Content } = Layout
  const navigate = useNavigate()

  const onFinish = async values => {
    const resultAction = await registerTherapist(values)
    if (resultAction) navigate('/')
  }
  return (
    <Layout className="LoginLayout">
      <HeaderMenu />
      <Content style={{ marginTop: '120px' }}>
        <Row style={{ padding: '30px 80px' }} align="middle" justify="start">
          <Col style={{ textAlign: 'start' }} span={24}>
            <Space>
              <div>{IntroText}</div>
            </Space>
          </Col>
        </Row>
        <Row style={{ padding: '50px 80px', background: '#fff' }} align="middle" justify="start">
          <Col flex="740px" style={{ textAlign: 'start' }} span={24}>
            <RegisterTherapistForm onFinish={onFinish} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
