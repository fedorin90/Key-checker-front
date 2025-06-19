import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = () => {
  const { user, isFetchingUser, hasFetchedUser } = useContext(AuthContext)
  if (!hasFetchedUser || isFetchingUser) {
    return null
  }

  return user.isDefault ? <Navigate to="/login" /> : <Outlet />
}

export default PrivateRoute
