import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';


const Register = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                <Card className="my-5 p-3">
                    <h2 className="text-center">Registrarse</h2>

                    <Form className = "form" onSubmit = {handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" {...register ("nombre", {required: true})} />
                        {errors.nombre && <span class="text-danger">Este campo es obligatorio</span>}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingresa tu email" {...register("email", {
                        required: 'El email es obligatorio',
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ingrese un correo electrónico válido'
                        }
                     })}/>
                        {errors.email && <span class="text-danger">{errors.email.message}</span>}
                    </Form.Group>
        
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" {...register("password",{
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}/>
                        {errors.password && <span class="text-danger">{errors.password.message}</span>}
                    </Form.Group>
                    <Button className = "form-button" variant="secondary" type="submit">
                        Regístrate
                    </Button>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Text>           
                            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                        </Form.Text>
                    </Form.Group>
                    </Form>
                </Card>
                </Col>
            </Row>
        </Container>
      )
    }


export default Register