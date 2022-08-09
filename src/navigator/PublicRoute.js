import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../shared/utils'

const PublicRoute = ({ children }) => {
  let location = useLocation()

  if (isLoggedIn()) {
    return <Navigate to={'/dashboard'} state={{ from: location }} />
  }

  return <>{children}</>
}

PublicRoute.propTypes = {
  children: PropTypes.children,
}

export default PublicRoute
