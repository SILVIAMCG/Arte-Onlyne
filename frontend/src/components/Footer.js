import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-2 py-md-3 py-lg-4">
        <Container className="mb-auto">
            <Row>
                <Col className='text-center py-3'> ArteOnlyne &copy; {year}</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer