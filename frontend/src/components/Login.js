import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useContext, useState, useEffect} from 'react';
import { userContext } from './context/DataContext.js';




const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const {loginUser} =useContext(userContext);

    
    const handleInputChange = () => {
        setErrorMessage(''); 
    };

    const onSubmit = handleSubmit(async(data) => {
        try{
        const isLogged = await loginUser(data); //isLogged viene de DataContext.js y debe ser true
        if (isLogged){
            navigate('/');
        }else{
            setErrorMessage("Error iniciando sesión");
            reset();
        }
        console.log(isLogged);
        } catch (error) {
            console.error("Error iniciando sesión:", error);
            setErrorMessage("Error iniciando sesión");
            reset();
        }
    });


  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <Card className="my-5 p-3">
                <h2 className="text-center">Iniciar Sesión</h2>
                {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                        )}
                <Form className = "form" onSubmit = {handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu email" {...register ("email", {required: true})} onChange={handleInputChange}/>
                    {errors.email && <span className="text-danger">Este campo es obligatorio</span>}
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" {...register ("password", {required: true})}/>
                    {errors.password && <span className="text-danger">Este campo es obligatorio</span>}
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