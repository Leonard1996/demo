import { Button, Col, Divider, Form, Input, Layout, message, Modal, Radio, Row, Space, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { getUser, ROLES, setGlobalUser } from '../../shared/utils'
import { HeaderMenu, SideMenu } from '../../modules'
import moment from 'moment'

import './style.css'
import { EditOutlined } from '@ant-design/icons'
import { MyTherapist } from '../MyTherapist/MyTherapist'

import { PrefixSelector } from '../../shared/components'
import { updateProfile } from '../../services'

export const Profile = () => {
  const [user, setUser] = useState(getUser() || {})
  const { role } = user
  if (role === ROLES.DOCTOR) return <MyTherapist />
  const {
    name,
    lastName,
    birthday,
    email,
    patient: {
      newsletter,
      details: { phone: phoneNr, address, zip, city },
    },
  } = user
  const prefix = phoneNr.substring(0, 3)
  const phone = phoneNr.substring(3)
  const [editModal, setEditModal] = useState(false)

  const showModal = () => {
    setEditModal(true)
  }

  const handleOk = async ({ newsletter, ...other }) => {
    setLoading(true)
    const data = { newsletter, details: { ...user.patient?.details, ...other } }
    data.details.phone = data.details.prefix + data.details.phone
    delete data.details.prefix
    const { error, msg, user: newUser } = await updateProfile(data)
    if (error) {
      return message.error(msg)
    }
    setGlobalUser(newUser)
    setUser(newUser)
    setLoading(false)
    setEditModal(false)
  }

  const handleCancel = () => {
    setEditModal(false)
  }

  const [loading, setLoading] = useState(false)

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderMenu />
      <Layout style={{ marginTop: '120px', padding: '0 50px' }}>
        <SideMenu />
        <Content>
          <Modal
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                form="editProfileForm"
                htmlType="submit"
                key="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Submit
              </Button>,
            ]}
            title="Edit Profile"
            visible={editModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              id="editProfileForm"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ address, zip, city, phone, prefix, newsletter }}
              onFinish={handleOk}
              onFinishFailed={() => {}}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item label="Indirizzo" name="address">
                <Input />
              </Form.Item>

              <Form.Item label="CAP" name="zip">
                <Input />
              </Form.Item>

              <Form.Item label="Città" name="city">
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Tel"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input
                  addonBefore=<PrefixSelector />
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              <Form.Item name="newsletter" label="Newsletter">
                <Radio.Group>
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
          <Row className="profile" style={{ paddingTop: '55px', paddingLeft: '300px' }}>
            <Col style={{ textAlign: 'start' }}>
              <Space size={10} direction="vertical">
                <div className="name">
                  {name} {lastName}
                </div>
                <div className="birthday">Data di nascita {moment(birthday).format('l')}</div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="payment-details">
                  <div>
                    Dati di fatturazione
                    <Tooltip title="Edit Profile">
                      <EditOutlined onClick={showModal} />
                    </Tooltip>
                  </div>
                  <div>Address: {address}</div>
                  <div>ZIP: {zip}</div>
                  <div>City: {city}</div>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="email">Email: {email}</div>
                <div className="phone">
                  Tel: {phoneNr}
                  <Tooltip title="Edit Profile">
                    <EditOutlined onClick={showModal} />
                  </Tooltip>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="newsletter">
                  Newsletter: {newsletter ? 'SI' : 'NO'}
                  <Tooltip title="Edit Profile">
                    <EditOutlined onClick={showModal} />
                  </Tooltip>
                </div>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
