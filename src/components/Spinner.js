import { Spinner as Loader } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Loader animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Loader>
    </Container>
  );
};

export default Spinner;
