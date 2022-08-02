import React from 'react'
import { ChangePassword, Consent, Dashboard, Landing, Login, Profile, Register, RegisterTherapist } from '../pages'

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
    name: 'Register',
    path: '/register',
    protected: false,
    element: <Register />,
  },
  {
    name: 'Register Therapist',
    path: '/registerth',
    protected: false,
    element: <RegisterTherapist />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    protected: true,
    element: <Dashboard />,
  },
  {
    name: 'My Profile',
    path: '/me',
    protected: true,
    element: <Profile />,
  },
  {
    name: 'Consent',
    path: '/consent',
    protected: true,
    element: <Consent />,
  },
  {
    name: 'Change Password',
    path: '/change-password',
    protected: true,
    element: <ChangePassword />,
  },
]
