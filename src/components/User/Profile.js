import { toast } from 'react-toastify'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Col, Row, Button, Container } from 'react-bootstrap'
import { api } from '../../api/axios'

const Profile = () => {
  const { user } = useContext(AuthContext)

  const handlePasswordReset = async () => {
    try {
      await api.post('auth/users/reset_password/', { email: user.email })
      toast.info(
        'We have sent you an email with the link to reset your password.'
      )
    } catch (error) {
      toast.error('Error updating profile:', error)
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col></Col>
        <Col xs={4}>
          <h1>Profile</h1>
          Email: {user.email}
          <p />
          <Button variant="outline-secondary" onClick={handlePasswordReset}>
            Reset Password
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Profile
