import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <Card className="my-5 p-3">
                <h2 className="text-center">Iniciar Sesión</h2>
                <Form className = "form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu email" />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button className = "form-button" variant="secondary" type="submit">
                    Iniciar Sesión
                </Button>
                <Form.Group className="mb-3 mt-3">
                    <Form.Text>           
                        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                    </Form.Text>    
                </Form.Group>
                </Form>
            </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Login