import React from 'react'
import Login from '../views/Login/Login'

export const paths =Object.freeze({
    LOGIN: "/login"
})

const routeNames = Object.freeze({
    LOGIN: 'Login'
 })

export const routes = [
    {
        name: routeNames.LOGIN,
        path: paths.LOGIN,
        protected: false,
        element: <Login />
    }
];
