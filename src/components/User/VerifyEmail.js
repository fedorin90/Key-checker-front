import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api/axios'
import { toast } from 'react-toastify'

const VerifyEmail = () => {
  const { uid, token } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.post('auth/users/activation/', {
          uid,
          token,
        })

        toast.success('Activation successfull! Please log in.')
        navigate('/login')
      } catch (error) {
        if (error.response) {
          console.log('Error status:', error.response.status) // HTTP статус ошибки
          console.log('Error detail:', error.response.data.detail) // Текст ошибки из `detail`
        } else {
          console.error('Request failed:', error.message)
        }
        navigate('/')
      }
    }

    verifyEmail()
  }, [token, uid, navigate])

  return <div></div>
}

export default VerifyEmail
