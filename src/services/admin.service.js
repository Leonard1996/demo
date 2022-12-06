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
  return await axios
    .get(`users/doctors`)
    .then(response => response.data.doctors)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getAllDoctorsStatistics = async () => {
  const docs = await axios
    .get(`users/doctors-statistics`)
    .then(response => response.data.statistics)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
  docs.forEach(doc => {
    const { therapist } = doc
    const { details, ...restTh } = therapist
    for (const k in restTh) {
      doc[k] = restTh[k]
    }
    for (const k in details) {
      doc[k] = details[k]
    }
    doc.rate = +(therapist.rate || 0)
    doc.rate = doc.rate.toFixed(2)
    const {
      totalSessionsDoneAndMoneyEarned: { numberOfSessions = 0, totalMoneyEarned },
    } = doc
    doc.totalPatientsActive = 0
    doc.totalPatientsInactive = 0
    doc.totalPatientsSolved = 0
    if (doc.patients) {
      doc.patients.forEach(p => {
        const { isActive, solved } = p.patient
        solved && doc.totalPatientsSolved++
        isActive ? doc.totalPatientsActive++ : doc.totalPatientsInactive++
      })
    }
    doc.totalPatients = doc.patients?.length || 0

    doc.numberOfSessions = numberOfSessions
    doc.totalMoneyEarned = totalMoneyEarned || 0
    doc.id = therapist.userId
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
    const { userAsPatient, latestDoctor: { doctor } = {} } = patient
    if (doctor) patient.doctor = `${doctor.name} ${doctor.lastName}`
    const { details, ...rest } = userAsPatient
    for (const k in rest) {
      patient[k] = rest[k]
    }
    for (const k in details) {
      patient[k] = details[k]
    }
    patient.freeTrial = userAsPatient.freeTrial
    patient.id = userAsPatient.userId
  })
  return patients
}

export const getAllUsers = async () => {
  return await axios
    .get(`users`)
    .then(response => ({ error: false, data: response.data.users }))
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const assignDoctor = async data => {
  return await axios
    .post(`patients-doctors`, data)
    .then(() => ({ error: false }))
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const updateDoctor = async data => {
  const { id, ...rest } = data
  return await axios
    .patch(`users/doctors/${id}`, rest)
    .then(() => ({ error: false }))
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getPatientDoctors = async patientId => {
  return await axios
    .get(`users/${patientId}/associates`)
    .then(response => response.data.associates)
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}

export const getAllOrders = async () => {
  return await axios
    .get(`orders/all`)
    .then(response => response.data.orders)
    .then(orders => {
      orders.forEach(r => {
        r.name = r.user?.name + ' ' + r.user?.lastName
        r.email = r.user?.email
      })
      return orders
    })
    .catch(e => {
      message.error(e.response?.data?.error?.message || 'Something went wrong!')
      return []
    })
}
