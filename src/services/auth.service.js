import axios from 'axios'
import { setGlobalUser, setLogin } from '../shared/utils'

export const login = async ({ remember, ...data }) => {
  return await axios
    .post('/login', data)
    .then(response => {
      const { token, user } = response.data.data
      setLogin(remember, token, user)
      return { error: false }
    })
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

// eslint-disable-next-line no-unused-vars
export const register = async ({ ignore, ...data }) => {
  const { email, password, confirmPassword, name, lastName, birthday, isSingle, newsletter, ...details } = data
  details.phone = details.prefix + details.phone
  delete details.prefix
  const dataToSend = {
    email,
    password,
    confirmPassword,
    name,
    lastName,
    birthday,
    isSingle,
    newsletter,
    details,
    form: 'test',
  }
  return await axios
    .post('/register', dataToSend)
    .then(response => ({ error: false, msg: response.data.message }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const registerTherapist = async data => {
  const formData = new FormData()
  const { cv, ...rest } = data
  formData.append('cv', cv.fileList[0].originFileObj)
  for (const d in rest) {
    formData.append(d, rest[d])
  }
  return await axios
    .post('/register-therapist', formData)
    .then(response => ({ error: false, msg: response.data.message }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const updateProfile = async data => {
  return await axios
    .patch('/users/me', data)
    .then(response => ({ error: false, msg: response.data.message, user: response.data.user }))
    .catch(e => ({
      error: true,
      msg: e.response?.data?.message || e.response?.data?.error?.message || 'Something went wrong!',
    }))
}

export const getMe = async () => {
  return await axios
    .get('/users/me')
    .then(response => {
      const { user } = response.data
      setGlobalUser(user)
      return { error: false }
    })
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}
