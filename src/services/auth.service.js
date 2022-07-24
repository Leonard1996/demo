import axios from 'axios'
import { TOKEN, USER } from '../shared/utils'

export const login = async ({ remember, ...data }) => {
  const response = await axios
    .post('/login', data)
    .catch(e => alert(e.response?.data?.error?.message || 'Something went wrong!'))
  const { token, user } = response.data.data
  if (remember) {
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(USER, user)
  } else {
    sessionStorage.setItem(TOKEN, token)
    sessionStorage.setItem(USER, user)
  }
  return true
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
