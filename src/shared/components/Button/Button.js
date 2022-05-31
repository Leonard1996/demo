import React from 'react'
import { Button as AntButton } from 'antd'
import PropTypes from 'prop-types'

const Button = ({ name, type, size, danger, ghost }) => {
  return (
    <AntButton type={type} size={size} danger={danger} ghost={ghost}>
      {name}
    </AntButton>
  )
}

Button.propTypes = {
  name: PropTypes.any,
  type: PropTypes.any,
  size: PropTypes.any,
  danger: PropTypes.any,
  ghost: PropTypes.any,
}

export default Button
