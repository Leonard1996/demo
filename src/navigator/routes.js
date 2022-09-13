import React from 'react'
import {
  Admin,
  ChangePassword,
  Chat,
  Consent,
  Dashboard,
  Landing,
  Login,
  MyOrders,
  MyPatients,
  MyTherapist,
  Products,
  Profile,
  Register,
  RegisterTherapist,
  Report,
  Schedule,
} from '../pages'
import { ROLES } from '../shared/utils'

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
    name: 'My Orders',
    path: '/my-orders',
    protected: true,
    role: ROLES.PATIENT,
    element: <MyOrders />,
  },
  {
    name: 'My Therapist',
    path: '/my-therapist',
    protected: true,
    role: ROLES.PATIENT,
    element: <MyTherapist />,
  },
  {
    name: 'My Schedule',
    path: '/schedule',
    protected: true,
    role: ROLES.DOCTOR,
    element: <Schedule />,
  },
  {
    name: 'My Reports',
    path: '/reports',
    protected: true,
    role: ROLES.DOCTOR,
    element: <Report />,
  },
  {
    name: 'My Patients',
    path: '/my-patients',
    protected: true,
    role: ROLES.DOCTOR,
    element: <MyPatients />,
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
  {
    name: 'Chat',
    path: '/chat',
    protected: true,
    element: <Chat />,
  },
  {
    name: 'Admin',
    path: '/admin',
    protected: true,
    role: ROLES.ADMIN,
    element: <Admin />,
  },
  {
    name: 'Products',
    path: '/products',
    protected: true,
    role: ROLES.ADMIN,
    element: <Products />,
  },
]
