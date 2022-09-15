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
  const { id, ...rest } = data
  if (id) {
    return await axios
      .patch(`products/${id}`, rest)
      .then(response => response.data.product)
      .catch(e => {
        message.error(e.response?.data?.error?.message || 'Something went wrong!')
        return []
      })
  }
  return await axios
    .post(`products`, data)
    .then(response => response.data.product)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}
