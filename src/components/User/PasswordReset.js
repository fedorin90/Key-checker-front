import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { api } from '../../api/axios'
import { toast } from 'react-toastify'
import { validatePassword } from '../../utils/validate'

const PasswordReset = () => {
  const { uid, token } = useParams()
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate()

  const validation = validatePassword(newPassword)
  const isPasswordValid = Object.values(validation).every(Boolean)
  const isRePasswordValid = newPassword === reNewPassword

  const isValid = isPasswordValid && isRePasswordValid

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      })
      toast.info('Password changed successfully!')
      navigate('/')
    } catch (err) {
      toast.error('Password reset failed')
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col></Col>
        <Col xs={4}>
          <h1>Password reset</h1>
          <Form onSubmit={handleSubmit}>
            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>New password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{
                    borderColor: newPassword
                      ? isPasswordValid
                        ? 'green'
                        : 'red'
                      : '#ccc',
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
              {newPassword && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ color: validation.length ? 'green' : 'red' }}>
                    {validation.length ? <FaCheck /> : <FaTimes />} At least 8
                    characters
                  </li>
                  <li style={{ color: validation.uppercase ? 'green' : 'red' }}>
                    {validation.uppercase ? <FaCheck /> : <FaTimes />} One
                    uppercase letter
                  </li>
                  <li style={{ color: validation.lowercase ? 'green' : 'red' }}>
                    {validation.lowercase ? <FaCheck /> : <FaTimes />} One
                    lowercase letter
                  </li>
                  <li style={{ color: validation.digit ? 'green' : 'red' }}>
                    {validation.digit ? <FaCheck /> : <FaTimes />} One digit
                  </li>
                  <li
                    style={{ color: validation.specialChar ? 'green' : 'red' }}
                  >
                    {validation.specialChar ? <FaCheck /> : <FaTimes />} One
                    special character
                  </li>
                </ul>
              )}
            </Form.Group>

            {/* Confirm Password (re_password) */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm new password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showRePassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={reNewPassword}
                  onChange={(e) => setReNewPassword(e.target.value)}
                  required
                  style={{
                    borderColor: reNewPassword
                      ? isRePasswordValid
                        ? 'green'
                        : 'red'
                      : '#ccc',
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowRePassword(!showRePassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showRePassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
              {reNewPassword && (
                <Form.Text
                  style={{ color: isRePasswordValid ? 'green' : 'red' }}
                >
                  {isRePasswordValid ? <FaCheck /> : <FaTimes />}{' '}
                  {isRePasswordValid
                    ? 'Passwords match'
                    : 'Passwords do not match'}
                </Form.Text>
              )}
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid}
              style={{ background: isValid ? '#007bff' : 'gray' }}
            >
              Change password
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default PasswordReset
