import { useContext } from 'react'
import { homeContext } from '../../context/HomeContext'
import { Navigate } from 'react-router-dom'

export default function AuthProtectedRoutes( { children }) {
 const { isLoggedIn } = useContext(homeContext)

  return !isLoggedIn ? children : <Navigate to={"/home"} />
}
