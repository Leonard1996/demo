import React from 'react'

import { getUser, isLoggedIn } from '../shared/utils'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ requiredRole, children }) => {
  let location = useLocation()
  if (!isLoggedIn()) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (requiredRole) {
    const { role } = getUser()
    if (role !== requiredRole) return <Navigate to={'/'} state={{ from: location }} />
  }
  return <>{children}</>
}

PrivateRoute.propTypes = {
  requiredRole: PropTypes.string,
  children: PropTypes.element,
}

export default PrivateRoute
