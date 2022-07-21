import React from 'react'
import Login from '../pages/Login/Login'
import Landing from '../pages/Landing/Landing'
import RegisterTherapist from '../pages/RegisterTherapist/RegisterTherapist'

export const paths = Object.freeze({
  LOGIN: '/login',
})

const routeNames = Object.freeze({
  LOGIN: 'Login',
})

export const routes = [
  {
    name: 'Landing',
    path: '/',
    protected: false,
    element: <Landing />,
  },
  {
    name: routeNames.LOGIN,
    path: paths.LOGIN,
    protected: false,
    element: <Login />,
  },
  {
    name: 'Register Therapist',
    path: '/registerth',
    protected: false,
    element: <RegisterTherapist />,
  },
]
