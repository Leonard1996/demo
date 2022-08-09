import React from 'react'

import './style.css'
import PropTypes from 'prop-types'

export const TherapistProfile = ({ data }) => {
  return (
    <div>
      {data.details.name} {data.details.lastName}
    </div>
  )
}

TherapistProfile.propTypes = {
  data: PropTypes.object,
}
