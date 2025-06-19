import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const token = cookies.get('auth_token')
const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Token ${token}` : '',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = cookies.get('auth_token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.resolve(error.response)
    }
    return Promise.reject(error)
  }
)

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.response?.status === 401) {
    event.preventDefault()
  }
})

const loginWithGoogle = async (googleAccessToken) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/google/`, {
      access_token: googleAccessToken,
    })

    return response.data.access_token
  } catch (error) {
    console.error('Google login error:', error)
  }
}

export { api, loginWithGoogle }
