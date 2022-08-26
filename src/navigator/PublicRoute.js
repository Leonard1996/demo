import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { getUser, isLoggedIn } from '../shared/utils'

const PublicRoute = ({ children }) => {
  let location = useLocation()

  if (isLoggedIn()) {
    const { role } = getUser()
    if (role === 'doctor') return <Navigate to={'/schedule'} state={{ from: location }} />
    return <Navigate to={'/dashboard'} state={{ from: location }} />
  }

  return <>{children}</>
}

PublicRoute.propTypes = {
  children: PropTypes.element,
}

export default PublicRoute
