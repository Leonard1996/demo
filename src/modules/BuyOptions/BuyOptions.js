import React, { useEffect, useState } from 'react'
import { Button, Col, Divider, Form, Input, message, Modal, Radio, Row } from 'antd'
import { createOrder, getActiveProducts, getProductPrice } from '../../services'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

export const BuyOptions = () => {
  const [buyOptions, setBuyOptions] = useState([])
  const [buyModal, setBuyModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  const [sale, setSale] = useState({ promoCode: '', giftCard: '' })
  const [finalPrice, setFinalPrice] = useState()

  useEffect(() => {
    getActiveProducts().then(d => setBuyOptions(d))
    // setBuyOptions(mock)
  }, [])
  const onFinish = ({ buyOption }) => {
    setSelectedProduct(buyOption)
    setFinalPrice(buyOption.price)
    setBuyModal(true)
  }
  const handleCancel = () => {
    setBuyModal(false)
  }
  const handleOk = async data => {
    // const { error, msg } = await createProduct(data)
    // if (error) {
    //   return message.error(msg)
    // }
    message.success('Buy successful!')
    console.log(data)
    setBuyModal(false)
  }
  const applySale = async ({ promoCode, giftCard }) => {
    setSale({ promoCode, giftCard })
    const product = await getProductPrice(selectedProduct.id, promoCode, giftCard)
    setFinalPrice(product.price)
  }
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
      key={o.id}
      value={o}
    >
      <div style={{ marginTop: '10px' }}>
        <div>{o.name}</div>
        <div>{o.price} €</div>
        <div>{o.typeOfSession}</div>
      </div>
    </Radio>
  ))
  return (
    <>
      <Modal footer={false} title="Acquista" visible={buyModal} onOk={handleOk} onCancel={handleCancel}>
        <Row style={{ display: 'flex' }}>
          <Col span={12}>
            <h3>Name: {selectedProduct.name}</h3>
          </Col>
          <Col span={12} style={{ alignItems: 'flex-start' }}>
            <h3>Nr of Sessions: {selectedProduct.numberOfSessions}</h3>
          </Col>
        </Row>
        <Row style={{ display: 'flex' }}>
          <Col span={12}>
            <h3>Price: {selectedProduct.price} €</h3>
          </Col>
          <Col span={12}>
            <h3>Type: {selectedProduct.typeOfSession}</h3>
          </Col>
        </Row>

        <Divider />
        <Form
          name="basic"
          labelAlign={'left'}
          labelWrap={true}
          autoComplete="off"
          requiredMark={false}
          colon={false}
          preserve={true}
          onFinish={applySale}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Promo Code" name="promoCode">
            <Input />
          </Form.Item>
          <Form.Item label="Gift Card" name="giftCard">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{ fontSize: '20px', height: '50px' }} type="primary" htmlType="submit">
              APLICA
            </Button>
          </Form.Item>
        </Form>
        <h2>Final Price: {finalPrice} €</h2>
        <PayPalScriptProvider
          options={{
            'client-id': 'AVloMapCBzuHktn8wyVtsbONRzTPsPJGrUIlEMn65kvURxlOIQBOW-mnR9xcDhDxYF4yediu8OjSDgvf',
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: finalPrice,
                    },
                  },
                ],
              })
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(async details => {
                const name = details.payer.name.given_name
                await createOrder(details.id, selectedProduct.id, finalPrice, sale.promoCode, sale.giftCard)
                alert(`Transaction completed by ${name}`)
              })
            }}
          />
        </PayPalScriptProvider>
      </Modal>

      <Form
        name="basic"
        labelAlign={'left'}
        labelWrap={true}
        autoComplete="off"
        requiredMark={false}
        colon={false}
        preserve={true}
        onFinish={onFinish}
      >
        <Form.Item
          name="buyOption"
          style={{ display: 'flex', justifyContent: 'space-between', overflow: 'auto' }}
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
    </>
  )
}
