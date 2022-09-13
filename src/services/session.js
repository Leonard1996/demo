import axios from 'axios'
import { message } from 'antd'

export const confirmSession = async id => {
  // return { lastName: 'derv', name: 'Dott. eri', startTime: '2022-08-11T11:00:01.000Z' }
  return await axios
    .patch(`sessions/${id}/confirm`)
    .then(response => response.data.session)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}
