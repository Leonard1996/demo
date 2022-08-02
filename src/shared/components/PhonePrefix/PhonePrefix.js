import { Form, Select } from 'antd'
import React from 'react'

export const PrefixSelector = () => (
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
