import React from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {sellerContext} from './context/SellerContext.js';
import Swal from 'sweetalert2';
import { userContext } from './context/DataContext.js';

//ESTE FORMULARIO SOLO DEBE SER ACCESIBLE CUANDO EL USUARIO LLENE SUS DATOS PERSONALES DE VENDEDOR
//Y HAYA PASADO LAS VALIDACIONES DE REGISTERSELLER

const RegisterBank = () => {

    const navigate = useNavigate();
    const {fetchSellerBankData} = useContext(sellerContext);
    const {updateToken} = useContext(userContext);
    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = handleSubmit (async(data) => {
        console.log("datos desde formulario antes de enviar",data);
        try{
            const res = await fetchSellerBankData(data);
            if (res){
                showAlert();
                updateToken(res.token);
                reset();
                setErrorMessage('');
                window.location.replace('/');
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

    const showAlert = ()=>{Swal.fire({
        icon: "success",
        title: "¡Felicitaciones!",
        text: "Ya puedes publicar tus productos",        
      });

    }


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
                            <Form.Select {...register("nombreBanco", { required: true })} onChange={handleInputChange}
                            >
                                <option value="">Selecciona tu banco</option>
                                <option value="Banco-Santander">Banco Santander</option>
                                <option value="Banco-Estado">Banco Estado</option>
                                <option value="Banco-Fallabella">Banco Fallabella</option>
                                <option value="Banco-BCI">Banco Crédito e Inversiones</option>
                                <option value="Banco-Scotiabank">Banco Scotiabank</option>
                                <option value="Banco-Itau">Banco Itaú</option>
                            </Form.Select>
                            {errors.nombreBanco && <span className="text-danger">Este campo es obligatorio</span>} 
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicLastNameAccountNum">
                            <Form.Label>Número de Cuenta</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa tu número de cuenta"{...register ("numeroCuenta", {required: true})} onChange={handleInputChange}/>
                            {errors.numeroCuenta && <span className="text-danger">Este campo es obligatorio</span>}  
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicAccountType">
                            <Form.Label>Tipo de Cuenta</Form.Label>
                            <Form.Select {...register("tipoCuenta", { required: true })} onChange={handleInputChange}
                            >
                                <option value="">Selecciona tu tipo de cuenta</option>
                                <option value="Cuenta-corriente">Cuenta Corriente</option>
                                <option value="Cuenta-vista">Cuenta Vista</option>
                                <option value="Cuenta-Rut">Cuenta Rut</option>
                                <option value="Chequera-electronica">Chequera Electrónica</option>
                            </Form.Select>
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