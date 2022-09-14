import axios from 'axios'
import { message } from 'antd'

export const getProducts = async () => {
  return await axios
    .get(`products`)
    .then(response => response.data.products)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const createProduct = async data => {
  // return { lastName: 'derv', name: 'Dott. eri', startTime: '2022-08-11T11:00:01.000Z' }
  return await axios
    .post(`products`, data)
    .then(response => response.data.product)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}
