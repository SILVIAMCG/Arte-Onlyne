import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer>
        <Container className="mb-auto">
            <Row>
                <Col className='text-center py-3'> ArteOnlyne &copy; {year}</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer