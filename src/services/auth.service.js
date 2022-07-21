import axios from 'axios'

export const login = async data => {
  const response = await axios.post('/login', data)
  console.log(response)
}

export const registerTherapist = async data => {
  const response = await axios.post('/register-therapist', data)
  console.log(response)
}
