import React, { useContext } from 'react'
import { homeContext } from '../../context/HomeContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes( { children }) {
 const { isLoggedIn  } = useContext(homeContext)

  return isLoggedIn ? children : <Navigate to={"/login"} />
}
