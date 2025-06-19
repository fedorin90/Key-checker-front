import { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const jumbotronStyle = {
  padding: '2rem 1rem',
  marginBottom: '2rem',
  backgroundColor: '#e9ecef',
  borderRadius: '.3rem',
}

const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <Container style={jumbotronStyle} className="mt-3">
      <h3 className="text-center m-3">Добро пожаловать</h3>
      {user.email ? (
        <>
          <p>
            Привет <strong>{user.email}</strong>,
          </p>
          <p>
            Это веб-приложение создано для проверки ключей Майкрософт на предмет
            использования.{' '}
          </p>
          <p>Для успешной проверки пройдите несколько шагов:</p>
          <ul>
            <li>Внесите список ключей в поле для ввода;</li>
            <li>Начните проверку;</li>
            <li>
              Дожитесь окончачания проверки и получите результат в виде списка;
            </li>
          </ul>
          <Button href="/keys-check">Начать</Button>
        </>
      ) : (
        <p>
          Для просмотра сожержимогго этого сайта пожалуйста{' '}
          <a href="/login">войдите</a> в свою учетную запись
        </p>
      )}
    </Container>
  )
}

export default Home
