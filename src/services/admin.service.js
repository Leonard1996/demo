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

export const getGiftCards = async () => {
  return await axios
    .get(`gift-cards`)
    .then(response => response.data.giftCards)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const createGiftCard = async data => {
  return await axios
    .post(`gift-cards`, data)
    .then(response => response.data.giftCard)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const deleteGiftCard = async id => {
  return await axios
    .delete(`gift-cards/${id}`)
    .then(response => response.data.giftCard)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getPromoCodes = async () => {
  return await axios
    .get(`promo-codes`)
    .then(response => response.data.promoCodes)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const createPromoCode = async data => {
  const { id, ...rest } = data
  if (id) {
    return await axios
      .patch(`promo-codes/${id}`, rest)
      .then(response => response.data.promoCode)
      .catch(e => {
        message.error(e.response?.data?.error?.message || 'Something went wrong!')
        return []
      })
  }
  return await axios
    .post(`promo-codes`, data)
    .then(response => response.data.promoCode)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const deletePromoCode = async id => {
  return await axios
    .delete(`promo-codes/${id}`)
    .then(response => response.data.promoCode)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getAllDoctors = async () => {
  const docs = await axios
    .get(`users/doctors-statistics`)
    .then(response => response.data.statistics)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
  docs.forEach(doc => {
    const { therapist } = doc
    doc.rate = +(therapist.rate || 0)
    doc.rate = doc.rate.toFixed(2)
    const {
      totalSessionsDoneAndMoneyEarned: { numberOfSessions = 0, totalMoneyEarned },
    } = doc
    doc.totalPatients = doc.patients?.length || 0
    doc.numberOfSessions = numberOfSessions
    doc.totalMoneyEarned = totalMoneyEarned || 0
  })
  return docs
}

export const getAllPatients = async () => {
  const patients = await axios
    .get(`users/patients-statistics`)
    .then(response => response.data.statistics)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
  patients.forEach(patient => {
    const { userAsPatient, latestDoctor: { doctor: { name, lastName } } = {} } = patient
    patient.doctor = `${name} ${lastName}`
    patient.freeTrial = userAsPatient.freeTrial
  })
  return patients
}
