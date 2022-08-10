import React from 'react'
import { Button, Form, Radio } from 'antd'

const buyOptions = [
  {
    credit: '1 credito',
    price: '40,00 €',
  },
  {
    credit: '5 crediti',
    price: '180,00 €',
    sale: '10%',
  },
  {
    credit: '10 crediti',
    price: '320,00 €',
    sale: '20%',
  },
]

export const BuyOptions = () => {
  const radioOptions = buyOptions.map(o => (
    <Radio
      style={{
        background: '#eee',
        padding: '20px 60px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
      }}
      key={o.price}
      value={o.price}
    >
      <div style={{ marginTop: '10px' }}>
        <div>{o.credit}</div>
        <div>{o.price}</div>
        <div>{o.sale}</div>
      </div>
    </Radio>
  ))
  return (
    <Form
      name="basic"
      labelAlign={'left'}
      labelWrap={true}
      autoComplete="off"
      requiredMark={false}
      colon={false}
      preserve={true}
    >
      <Form.Item
        name="buyOption"
        style={{ display: 'flex', justifyContent: 'space-between' }}
        rules={[
          {
            required: true,
            message: 'Please select an item!',
          },
        ]}
      >
        <Radio.Group style={{ display: 'flex', justifyContent: 'space-between' }}>{radioOptions}</Radio.Group>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button style={{ fontSize: '20px', height: '50px' }} type="primary" htmlType="submit">
          ACQUISTA
        </Button>
      </Form.Item>
    </Form>
  )
}
