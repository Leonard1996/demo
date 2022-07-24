import React, { useState } from 'react'
import { Button, Form, Progress, Radio, Space } from 'antd'
import PropTypes from 'prop-types'
import TextArea from 'antd/es/input/TextArea'

const Step2Form = ({ next, prev, percentage, formData }) => {
  const [data, setData] = useState(formData)

  const onChange = value => {
    setData(value)
  }
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 24 }}
        labelAlign={'left'}
        labelWrap={true}
        initialValues={formData}
        onFinish={next}
        autoComplete="off"
        requiredMark={false}
        colon={false}
        onValuesChange={(_, allFields) => {
          onChange(allFields)
        }}
      >
        <Form.Item
          name="isSingle"
          label="Per chi stai compilando il questionario?"
          rules={[
            {
              required: true,
              message: 'Please select an item!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="1">Per me stessa/o</Radio>
              <Radio value="0">Per me e il mio partner</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="motivation"
          label="Vorremmo comprendere al meglio le tue esigenze. Descrivici brevemente la motivazione per cui ci contatti."
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {prev && (
              <Button style={{ marginRight: '5px' }} type="primary" onClick={() => prev(data)}>
                TORNA INDIETRO
              </Button>
            )}
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
Step2Form.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  percentage: PropTypes.number,
  formData: PropTypes.object,
}

export default Step2Form
