import axios from 'axios'
import { setLogin } from '../shared/utils'

export const login = async ({ remember, ...data }) => {
  const response = await axios
    .post('/login', data)
    .catch(e => alert(e.response?.data?.error?.message || 'Something went wrong!'))
  const { token, user } = response.data.data
  setLogin(remember, token, user)
  return true
}

// eslint-disable-next-line no-unused-vars
export const register = async ({ ignore, ...data }) => {
  const response = await axios
    .post('/register', data)
    .catch(e => alert(e.response?.data?.error?.message || 'Something went wrong!'))
  if (response) {
    alert(response.data.message)
    return true
  }
}

export const registerTherapist = async data => {
  const formData = new FormData()
  const { cv, ...rest } = data
  formData.append('cv', cv.fileList[0].originFileObj)
  for (const d in rest) {
    formData.append(d, rest[d])
  }
  const response = await axios
    .post('/register-therapist', formData)
    .catch(e => alert(e.response?.data?.error?.message || 'Something went wrong!'))
  if (response) {
    alert(response.data.message)
    return true
  }
}
