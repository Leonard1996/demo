import React from 'react'
import axios from 'axios'

import { getToken, isLoggedIn } from '../shared/utils'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
  let navigate = useNavigate()
  let location = useLocation()

  React.useEffect(() => {
    const token = getToken()
    if (token === null) {
      axios.defaults.headers.common.Authorization = ''
      localStorage.clear()
      navigate('/login')
    } else {
      navigate(location.pathname)
    }
  }, [location.pathname, navigate])

  if (!isLoggedIn()) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  //
  // if (isLoggedIn()) {
  //   return <Navigate to={'/not-found'} state={{ from: location }} />
  // }

  return <>{children}</>
}

PrivateRoute.propTypes = {
  children: PropTypes.children,
}

export default PrivateRoute
