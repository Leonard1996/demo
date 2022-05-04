import React from 'react'
import axios from 'axios'

import { getToken, isLoggedIn } from '../shared/utils'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children, pageName }) => {
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

  if (isLoggedIn()) {
    return <Navigate to={'/not-found'} state={{ from: location }} />
  }

  return <>{children}</>
}

export default PrivateRoute
