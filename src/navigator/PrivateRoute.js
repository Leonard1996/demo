import React, { useEffect } from 'react'

import { getUser, isLoggedIn } from '../shared/utils'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getMe } from '../services'

const PrivateRoute = ({ requiredRole, children }) => {
  useEffect(() => {
    getMe().then()
  }, [])
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
