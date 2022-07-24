import React from 'react'
import { Button, Form, Input, Progress, Select } from 'antd'
import PropTypes from 'prop-types'

const Step1Form = ({ next, percentage, formData }) => {
  const ages = [...Array(82).keys()].map(age => (
    <Select.Option key={age} value={age + 18}>
      {age + 18}
    </Select.Option>
  ))
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue="39"
      >
        <Select.Option value="39">+39</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  )
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
          <Select placeholder="Please select your age">{ages}</Select>
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
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
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
