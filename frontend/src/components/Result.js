import React from 'react';
import { Container, Card, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Result = ({result}) => {
  return (
    <Container>
        <Card>
        <h1 className="text-center"> Su orden fue procesada correctamente </h1>
        <Card.Img src="/img/clienteFeliz.png" variant="top" className="cliente img-fluid"/>
        </Card>
        <hr />
        <Row>
            <Col md={8}>
                <h3> Id de su  orden: {result._id}</h3>
                <h3> Total: {result.totalPrecio}</h3>
                <h3>Costo de envio: {result.costoEnvio} </h3>
                <h3>Estado de la orden: {result.estado} </h3>
            </Col>
            <Col md={4}>
                <Link className ="btn btn-primary my-3" to="/">Finalizar</Link>
            </Col>
        </Row>
    </Container>
  )
}

export default Result