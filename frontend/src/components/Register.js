import React from 'react'
import {registerRequest} from './api/auth.js';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useContext, useState, useEffect} from 'react';
import { userContext } from './context/DataContext.js';




const Register = () => {

    const {setUser, setIsAuthenticated, fetchUser} = useContext(userContext);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = handleSubmit(async(data) => {
        try{
         const res = await fetchUser(data);
         console.log(res);
         if(res){
        setIsAuthenticated(true);
        reset();
        setErrorMessage('');
        navigate('/login');
         }else{
            setErrorMessage("Error registrando usuario");
            reset();
         }
        } catch (error) {
            console.error("Error registrando usuario:", error);
            setErrorMessage("Error registrando usuario");
            reset();
        }
    });

    const handleInputChange = () => {
        setErrorMessage(''); 
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                <Card className="my-5 p-3">
                    <h2 className="text-center">Registrarse</h2>
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                        )}
                    <Form className = "form" onSubmit = {handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" {...register ("nombre", {required: true})} onChange={handleInputChange}/>
                        {errors.nombre && <span className="text-danger">Este campo es obligatorio</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ingresa tu email" {...register("email", {
                        required: 'El email es obligatorio',
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ingrese un correo electrónico válido'
                        }
                     })} onChange={handleInputChange}/>
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </Form.Group>
        
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" {...register("password",{
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })} onChange={handleInputChange}/>
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
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