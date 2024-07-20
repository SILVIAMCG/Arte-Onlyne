import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {sellerContext} from './context/SellerContext.js';

//ESTE FORMULARIO SOLO DEBE SER ACCESIBLE CUANDO EL USUARIO LLENE SUS DATOS PERSONALES DE VENDEDOR
//Y HAYA PASADO LAS VALIDACIONES DE REGISTERSELLER

const RegisterBank = () => {

    const navigate = useNavigate();
    const {fetchSellerBankData} = useContext(sellerContext);
    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = handleSubmit (async(data) => {
        console.log("datos desde formulario antes de enviar",data);
        try{
            const res = await fetchSellerBankData(data);
            if (res){
                console.log("datos desde formulario",res);
                reset();
                setErrorMessage('');
            }
        }catch (error){
            console.error("Error registrando datos bancarios desde el form:", error);
            setErrorMessage("Error registrando datos bancarios");
            reset();
        };

    });

    const handleInputChange = () => {
        setErrorMessage(''); 
    };


  return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="my-5 p-3">
                        <h2 className="text-center">Completa tus datos bancarios</h2>
                        <h2 className="text-center">Para recibir el dinero de tu venta</h2>
                        {errorMessage && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                            )}
                        <Form className = "form" onSubmit= {handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicNameBank">
                            <Form.Label>Nombre Banco</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa tu banco"{...register ("nombreBanco", {required: true})} onChange={handleInputChange}/>
                            {errors.nombreBanco && <span className="text-danger">Este campo es obligatorio</span>} 
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicLastNameAccountNum">
                            <Form.Label>Número de Cuenta</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa tu número de cuenta"{...register ("numeroCuenta", {required: true})} onChange={handleInputChange}/>
                            {errors.numeroCuenta && <span className="text-danger">Este campo es obligatorio</span>}  
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicAccountType">
                            <Form.Label>Tipo de Cuenta</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa tu tipo de cuenta"{...register ("tipoCuentat", {required: true})} onChange={handleInputChange}/>
                            {errors.tipoCuenta && <span className="text-danger">Este campo es obligatorio</span>}  
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicTitular">
                            <Form.Label>Titular de la Cuenta</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa nombre del titular" {...register ("titularCuenta", {required: true})} onChange={handleInputChange}/>
                            {errors.titularCuenta && <span className="text-danger">Este campo es obligatorio</span>} 
                        </Form.Group>
    
                        <Button className = "form-button" variant="secondary" type="submit">
                            Registrarse
                        </Button>
    
                        </Form>                
                    </Card>
                </Col>
            </Row>
        </Container>
      )
    };
  


export default RegisterBank