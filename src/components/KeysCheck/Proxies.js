import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { api } from '../../api/axios'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const Proxies = () => {
  const { user } = useContext(AuthContext)
  const [newProxy, setNewProxy] = useState({
    ip: '',
    port: '',
    username: '',
    password: '',
  })
  const [proxies, setProxies] = useState([])

  const loadProxies = async () => {
    const res = await api.get('keys-checker/proxies/')
    setProxies(res.data)
  }

  const handleAdd = async () => {
    try {
      await api.post('keys-checker/proxies/', newProxy)
      setNewProxy({ ip: '', port: '', username: '', password: '' })
      loadProxies()
    } catch (err) {
      console.error(err)
      alert('Ошибка при добавлении прокси')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Удалить Прокси?')) {
      await api.delete(`keys-checker/proxies/${id}/`)
      loadProxies()
    }
  }

  useEffect(() => {
    loadProxies()
  }, [])

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Управление Proxy</h2>
        </Col>
      </Row>

      <Form className="my-3 mb-5">
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Добавить Proxy</Form.Label>

              <Form.Control
                type="ip"
                value={newProxy.ip}
                className="mb-1"
                onChange={(e) =>
                  setNewProxy({ ...newProxy, ip: e.target.value })
                }
                placeholder="IP"
              />

              <Form.Control
                type="port"
                value={newProxy.port}
                className="mb-1"
                onChange={(e) =>
                  setNewProxy({ ...newProxy, port: e.target.value })
                }
                placeholder="Port"
              />

              <Form.Control
                type="username"
                value={newProxy.username}
                className="mb-1"
                onChange={(e) =>
                  setNewProxy({ ...newProxy, username: e.target.value })
                }
                placeholder="Username"
              />

              <Form.Control
                type="password"
                value={newProxy.password}
                className="mb-1"
                onChange={(e) =>
                  setNewProxy({ ...newProxy, password: e.target.value })
                }
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAdd}>
              Добавить
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>IP</th>
            <th>Port</th>
            <th>Username</th>
            <th>Password</th>
            <th>Последняя проверка</th>
            <th>Счетчик использования</th>
            <th>Дата последнего использования</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {proxies.map((acc) => (
            <tr key={acc.id}>
              <td>{acc.ip}</td>
              <td>{acc.port}</td>
              <td>{acc.username}</td>
              <td>{acc.password}</td>
              <td>{acc.last_checked ?? '—'}</td>
              <td>{acc.usage_count ?? '—'}</td>
              <td>{acc.last_used_at ?? '—'}</td>

              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(acc.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать аккаунт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  )
}

export default Proxies
