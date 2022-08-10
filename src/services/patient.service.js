import axios from 'axios'

export const getMyTherapist = async () => {
  return await axios
    .get('/patients/therapist')
    .then(response => ({ error: false, data: response.data.therapist }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}

export const getNextSession = async () => {
  return { lastName: 'derv', name: 'Dott. eri', startTime: '2022-08-11T11:00:01.000Z' }
  // return await axios
  //   .get(`/sessions/my-agenda?month=${month}`)
  //   .then(response => response.data)
  //   .catch(e => {
  //     message.error(e.response?.data?.error?.message || 'Something went wrong!')
  //     return []
  //   })
}
