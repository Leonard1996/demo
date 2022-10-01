import axios from 'axios'
import { message } from 'antd'

export const getMyTherapist = async () => {
  return await axios
    .get('/patients/therapist')
    .then(response => ({ error: false, data: response.data.therapist }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const getNextSession = async () => {
  // return { lastName: 'derv', name: 'Dott. eri', startTime: '2022-08-11T11:00:01.000Z' }
  return await axios
    .get(`sessions/patients/next-session`)
    .then(response => response.data.nextSession)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getActiveProducts = async () => {
  return await axios
    .get(`products/active`)
    .then(response => response.data.products)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getProductPrice = async (productId, promoCode, giftCard) => {
  return await axios
    .post(`products/${productId}/price`, { promoCode, giftCard })
    .then(response => response.data.product)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const createOrder = async (orderId, productId, price, promoCode = '', giftCard = '') => {
  return await axios
    .get(`orders/${orderId}`, { params: { productId, promoCode, giftCard, price } })
    .then(response => response.data.order)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
    })
}

export const getOrders = async () => {
  return await axios
    .get(`orders`)
    .then(response => response.data.orders)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}
