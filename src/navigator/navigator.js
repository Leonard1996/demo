import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { routes } from './routes'

const Navigator = () => {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              route.protected ? <PrivateRoute pageName={route.name}>{route.element}</PrivateRoute> : <PublicRoute>{route.element}</PublicRoute>
            }
          ></Route>
        ))}
        <Route path="*" element={<div>Not found!</div>}></Route>
      </Routes>
    </>
  )
}

export default Navigator
