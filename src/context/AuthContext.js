import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { api } from '../api/axios'
import Spinner from '../components/Spinner'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const defaultUser = {
    email: '',
    isDefault: true,
  }
  const [user, setUser] = useState(defaultUser)
  const [cookies, setCookie] = useCookies(['auth_token'])
  const [isFetchingUser, setIsFetchingUser] = useState(false)
  const [hasFetchedUser, setHasFetchedUser] = useState(false)

  const fetchUser = async (token = cookies.auth_token) => {
    if (!token || isFetchingUser || hasFetchedUser) return
    setIsFetchingUser(true)
    try {
      const response = await api.get('auth/users/me/')

      setUser({
        id: response.data.id,
        email: response.data.email,
        isDefault: false,
        isStaff: response.data.is_staff,
      })
    } catch (err) {
      console.error('Ошибка при запросе пользователя:', err)

      setUser(defaultUser)
    } finally {
      setIsFetchingUser(false)
      setHasFetchedUser(true)
    }
  }

  const logoutUser = async () => {
    try {
      await api.post('auth/token/logout/')
      setCookie('auth_token', '', { path: '/' })
      setUser(defaultUser)
      toast.info('Logged out')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  useEffect(() => {
    if (cookies.auth_token && user.isDefault && !isFetchingUser) {
      fetchUser()
    }
  }, [cookies.auth_token])

  const contextData = {
    user,
    cookies,
    isFetchingUser,
    hasFetchedUser,
    setUser,
    setCookie,
    logoutUser,
    fetchUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {cookies.auth_token && isFetchingUser ? <Spinner /> : children}
    </AuthContext.Provider>
  )
}
