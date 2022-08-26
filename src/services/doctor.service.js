import axios from 'axios'
import { message } from 'antd'
import moment from 'moment'

export const getPatients = async () => {
  return await axios
    .get('/sessions/patients')
    .then(response => ({ error: false, data: response.data.patients }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const getPatientDetails = async id => {
  return await axios
    .get(`/sessions/patients/${id}`)
    .then(response => ({ error: false, data: response.data.patients }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const getPatientNextSession = async id => {
  return await axios
    .get(`/sessions/patients/${id}`)
    .then(response => ({ error: false, data: response.data.patients }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const getAllSessions = async year => {
  const allSessions = await axios
    .get(`/sessions/all?year=${year}`)
    .then(response => response.data.allSessions)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
  const session = allSessions.reduce((o, { amount, isConfirmed, month, done }) => {
    o[month] = o[month] || { confirmed: 0, unConfirmed: 0, done: 0 }
    o[month][isConfirmed ? 'confirmed' : 'unConfirmed'] += +amount
    o[month].done += +done
    return o
  }, {})
  const monthsNames = moment.months()
  return monthsNames.map((m, i) => ({ name: `${m} ${year}`, ...session[i + 1] }))
}

export const getSessions = async month => {
  return await axios
    .get(`/sessions/my-agenda?month=${month}`)
    .then(response => response.data)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const createSession = async value => {
  value.month = moment(value.startTime).month() + 1
  return await axios
    .post('/sessions/', value)
    .then(response => ({ error: false, msg: response.data.message }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}
