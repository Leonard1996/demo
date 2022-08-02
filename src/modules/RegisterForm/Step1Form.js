import React from 'react'
import { Button, DatePicker, Form, Input, Progress } from 'antd'
import PropTypes from 'prop-types'
import { PrefixSelector } from '../../shared/components'
import moment from 'moment'

const Step1Form = ({ next, percentage, formData }) => {
  // const ages = [...Array(82).keys()].map(age => (
  //   <Select.Option key={age} value={age + 18}>
  //     {age + 18}
  //   </Select.Option>
  // ))
  const disabledDate = current => {
    return current && current > moment().subtract(18, 'years').endOf('day')
  }
  const defaultPickerValue = moment().subtract(18, 'years')
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        labelAlign={'left'}
        labelWrap={true}
        initialValues={formData}
        onFinish={next}
        autoComplete="off"
        requiredMark={false}
        colon={false}
        preserve={true}
      >
        <Form.Item label="Come ti chiami?" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Il tou cognome?"
          name="lastName"
          rules={[{ required: true, message: 'Please input your lastName!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Quanti anni hai?"
          tooltip="Per poter accedere ai servizi di PSIQO, devi essere maggiorenne"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select age!',
            },
          ]}
        >
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} defaultPickerValue={defaultPickerValue} />
          {/*<Select placeholder="Please select your age">{ages}</Select>*/}
        </Form.Item>

        <Form.Item label="La tua email?" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Il tou numero di telefono?"
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

        <Form.Item
          label="Il tuo password?"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Conferma password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Progress percent={percentage} />
            {next && (
              <Button type="primary" htmlType="submit">
                PROSEGUI
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  )
}
Step1Form.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  percentage: PropTypes.number,
  formData: PropTypes.object,
}

export default Step1Form
