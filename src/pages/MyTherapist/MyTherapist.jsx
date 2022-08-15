import { Col, Divider, Image, Layout, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { HeaderMenu, SideMenu } from '../../modules'
import './style.css'
import { getMyTherapist } from '../../services'
import { getUser } from '../../shared/utils'
import moment from 'moment'
import PropTypes from 'prop-types'

const Contacts = ({ birthday, email, phone, type }) => (
  <Row style={{ marginTop: '50px' }}>
    <Col style={{ textAlign: 'start' }}>
      <div className="birthday">Data di nascita {moment(birthday).format('l')}</div>
      <div className="email">Email: {email}</div>
      <div className="phone">Tel: {phone}</div>
      <div className="type">Tipologia: {type}</div>
      <Divider plain={true} style={{ margin: '10px 0' }} />
      <div>HAI MODIFICHE DA SUGGERIRE?</div>
      <div>Contatta il team di PSIQO.</div>
    </Col>
  </Row>
)

export const MyTherapist = () => {
  const [data, setData] = useState({})
  const user = getUser()
  const { role } = user
  useEffect(() => {
    if (role === 'patient') {
      getMyTherapist().then(d => setData(d.data || {}))
    } else {
      setData({ ...user, ...user.therapist })
    }
  }, [])
  const { details: { type, cover_letter, birthday, experiences = '' } = {} } = data
  const { name, lastName } = data
  const experiencesList = experiences.split(',').map((exp, i) => <div key={i}>{exp}</div>)
  const intro = role === 'doctor' ? <div className="intr">La mia scheda visibile ai pazienti</div> : ''

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content className="my-therapist" style={{ paddingTop: '55px', paddingLeft: '180px' }}>
          {intro}
          <Row>
            <Col>
              <Image width={200} src="/images/therapist.png" preview={false} />
            </Col>
            <Col style={{ textAlign: 'start', marginLeft: '50px' }}>
              <Space size={10} direction="vertical">
                <div className="name">
                  Dott. {name} {lastName}
                </div>
                <div className="birthday">Etá: {moment().diff(birthday, 'years')}</div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="type">Approccio {type}</div>
                <Divider style={{ margin: '10px 0' }} />
                <Space size={2} direction="vertical">
                  <div className="experiences">Specializzazioni:</div>
                  {experiencesList}
                </Space>
                <Divider style={{ margin: '10px 0' }} />
                <div className="cover">{cover_letter}</div>
              </Space>
            </Col>
          </Row>
          {role === 'doctor' && <Contacts {...data.details} />}
        </Content>
      </Layout>
    </Layout>
  )
}

Contacts.propTypes = {
  birthday: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  type: PropTypes.string,
}
