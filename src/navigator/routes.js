import React from 'react'
import {
  Admin,
  AllDoctors,
  AllPatients,
  ChangePassword,
  Chat,
  Consent,
  Dashboard,
  GiftCards,
  Landing,
  Login,
  MyOrders,
  MyPatients,
  MyTherapist,
  Products,
  Profile,
  PromoCodes,
  Register,
  RegisterTherapist,
  Report,
  RTC,
  Schedule,
  ValidateUser,
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
  {
    name: 'GiftCards',
    path: '/gift-cards',
    protected: true,
    role: ROLES.ADMIN,
    element: <GiftCards />,
  },
  {
    name: 'PromoCodes',
    path: '/promo-codes',
    protected: true,
    role: ROLES.ADMIN,
    element: <PromoCodes />,
  },
  {
    name: 'RTC',
    path: '/rtc',
    protected: true,
    element: <RTC />,
  },
  {
    name: 'AllDoctors',
    path: '/all-doctors',
    protected: true,
    role: ROLES.ADMIN,
    element: <AllDoctors />,
  },
  {
    name: 'AllPatients',
    path: '/all-patients',
    protected: true,
    role: ROLES.ADMIN,
    element: <AllPatients />,
  },
  {
    name: 'ValidateUser',
    path: '/validate-user',
    element: <ValidateUser />,
  },
]
