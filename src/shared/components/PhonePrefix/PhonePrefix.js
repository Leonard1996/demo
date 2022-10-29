import { Form, Select } from 'antd'
import React from 'react'
import { COUNTRY_CODES } from '../../utils'

export const PrefixSelector = () => {
  const options = COUNTRY_CODES.map(code => (
    <Select.Option key={code.code} value={code.dial_code}>
      {code.code} {code.dial_code}
    </Select.Option>
  ))

  return (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 120,
        }}
      >
        {options}
      </Select>
    </Form.Item>
  )
}
