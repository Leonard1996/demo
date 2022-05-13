import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../shared/utils";

const PublicRoute = ({ children }) => {
  let location = useLocation()

  if (isLoggedIn()) {
    return <Navigate to={'/'} state={{ from: location }} />
  }

  return <>{children}</>
}

export default PublicRoute
