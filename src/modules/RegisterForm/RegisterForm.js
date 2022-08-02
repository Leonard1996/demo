import React, { useState } from 'react'
// import { Progress } from 'antd'
import PropTypes from 'prop-types'
// import moment from 'moment'
// import TextArea from 'antd/es/input/TextArea'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'
import Step3Form from './Step3Form'
import Step4Form from './Step4Form'

import './style.css'

export const RegisterForm = ({ onFinish }) => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({ name: 'test' })
  const next = data => {
    if (data.errorFields) return
    const newFormData = { ...formData, ...data }
    setFormData(newFormData)
    if (step === 3) return onFinish(newFormData)
    setStep(step + 1)
  }
  const prev = data => {
    const newFormData = { ...formData, ...data }
    setFormData(newFormData)
    setStep(step - 1)
  }

  const steps = [
    <Step1Form key={0} next={next} percentage={0} formData={formData} />,
    <Step2Form key={1} next={next} prev={prev} percentage={33} formData={formData} />,
    <Step3Form key={2} next={next} prev={prev} percentage={66} formData={formData} />,
    <Step4Form key={3} next={next} prev={prev} percentage={100} formData={formData} />,
  ]
  return <div className="register-form">{steps[step]}</div>
}
RegisterForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
}
