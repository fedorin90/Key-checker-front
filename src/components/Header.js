import { Container, Navbar, Nav } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  IoPersonAddOutline,
  IoLogInOutline,
  IoLogOutOutline,
} from 'react-icons/io5'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/img/logo.svg"
            width="200"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          {user.isDefault ? (
            <Navbar.Text className="me-2">Гость</Navbar.Text>
          ) : (
            <>
              {user?.isStaff && (
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/ms-manage/">
                    MS аккаунты
                  </Nav.Link>
                  <Nav.Link as={Link} to="/proxies/">
                    Proxies
                  </Nav.Link>
                </Nav>
              )}
              <Navbar.Text className="me-2">
                <a href="/profile">{user.email}</a>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
        <ButtonGroup aria-label="auth func">
          {user.isDefault ? (
            <>
              <Button
                href="/login"
                className="fs-4"
                data-bs-toggle="tooltip"
                title="Войти"
                variant="link"
              >
                <IoLogInOutline />
              </Button>
              <Button
                href="/register"
                className="fs-4"
                data-bs-toggle="tooltip"
                title="Регистрация"
                variant="link"
              >
                <IoPersonAddOutline />
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              data-bs-toggle="tooltip"
              className="fs-4"
              title="Выйти"
              variant="link"
            >
              <IoLogOutOutline />
            </Button>
          )}
        </ButtonGroup>
      </Container>
    </Navbar>
  )
}

export default Header
