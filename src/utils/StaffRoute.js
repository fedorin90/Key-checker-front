import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const StaffRoute = () => {
  const { user, isFetchingUser, hasFetchedUser } = useContext(AuthContext)

  if (!hasFetchedUser || isFetchingUser) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!user.isStaff) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default StaffRoute
