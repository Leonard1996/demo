import axios from 'axios'
import { message } from 'antd'

export const confirmSession = async id => {
  return await axios
    .patch(`sessions/${id}/confirm`)
    .then(response => response.data.session)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const doneSession = async id => {
  return await axios
    .patch(`sessions/${id}/done`)
    .then(response => response.data.session)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
    })
}

export const getRtcToken = async ({ id, link }) => {
  return await axios
    .get(`sessions/${id}/verify/${link}?channelName=psiqo`)
    .then(response => response.data.RTCToken)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
    })
}
