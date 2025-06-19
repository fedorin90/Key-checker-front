import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { api } from '../../api/axios'
import { toast } from 'react-toastify'
import { validatePassword, validateEmail } from '../../utils/validate'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate()

  const validation = validatePassword(password)
  const isEmailValid = validateEmail(email)
  const isPasswordValid = Object.values(validation).every(Boolean)
  const isRePasswordValid = password === rePassword

  const isValid = isEmailValid && isPasswordValid && isRePasswordValid

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('auth/users/', {
        email,
        password,
        re_password: rePassword,
        first_name: firstName,
        last_name: lastName,
      })
      toast.info(`Please confirm your email  "${response.data.email}"`)
      navigate('/login')
    } catch (err) {
      toast.error(err.response.data.error || 'Registration failed')
    }
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col></Col>
        <Col xs={4}>
          <h1>Регистрация</h1>
          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderColor: email
                    ? isEmailValid
                      ? 'green'
                      : 'red'
                    : '#ccc',
                }}
              />
              {email && (
                <Form.Text style={{ color: isEmailValid ? 'green' : 'red' }}>
                  {isEmailValid ? (
                    <>
                      <FaCheck /> Valid email
                    </>
                  ) : (
                    <>
                      <FaTimes /> Invalid email format
                    </>
                  )}
                </Form.Text>
              )}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введи свой пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderColor: password
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
              {password && (
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
              <Form.Label>Повторить пароль</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showRePassword ? 'text' : 'password'}
                  placeholder="Введи свой пароль еще раз"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                  style={{
                    borderColor: rePassword
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
              {rePassword && (
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

            {/* Terms and Conditions */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    Я принимаю{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </a>
                    .
                  </>
                }
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid}
              style={{ background: isValid ? '#007bff' : 'gray' }}
            >
              Создать аккаунт
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Register
