import axios from 'axios'

export const getMyTherapist = async () => {
  return await axios
    .get('/patients/therapist')
    .then(response => ({ error: false, data: response.data.therapist }))
    .catch(e => ({ error: true, msg: e.response?.data?.error?.message || 'Something went wrong!' }))
}
