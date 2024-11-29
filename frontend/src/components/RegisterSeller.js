import React from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import { sellerContext } from './context/SellerContext.js';
import { rutValidation } from '../utils/validationData.js';



const RegisterSeller = () => {
    const {isCompleted, setIsCompleted, fetchSellerData} = useContext(sellerContext);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = handleSubmit(async(data) => {
        try{
            if (rutValidation(data.rut) === false) {
                setErrorMessage("Rut inválido");
                return;
            }
            const res = await fetchSellerData(data);
            if (res){
            setIsCompleted(true);
            navigate('/banco');
            reset();
            setErrorMessage('');
            }else{
                setErrorMessage("Error registrando usuario");
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
                        <h2 className="text-center">Completa tus datos</h2>
                        {errorMessage && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                            )}
                        <Form className = "form" onSubmit= {handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu nombre"{...register ("nombre", {required: true})} onChange={handleInputChange}/>
                                {errors.nombre && <span className="text-danger">Este campo es obligatorio</span>} 
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastNamePat">
                                <Form.Label>Apellido Paterno</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu apellido paterno"{...register ("apellidoPat", {required: true})} onChange={handleInputChange}/>
                                {errors.apellidoPat && <span className="text-danger">Este campo es obligatorio</span>}  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastNameMat">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu apellido materno"{...register ("apellidoMat", {required: true})} onChange={handleInputChange}/>
                                {errors.apellidoMat && <span className="text-danger">Este campo es obligatorio</span>}  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicRut">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu RUT" {...register ("rut", {required: 
                                'Este campo es obligatorio',
                                }
                                )} 
                                onChange={handleInputChange}/>
                                {errors.rut && <span className="text-danger">{errors.rut.message}</span>} 
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu teléfono" {...register ("telefono", {required: true})} onChange={handleInputChange}/>
                                {errors.telefono && <span className="text-danger">Este campo es obligatorio</span>} 
                            </Form.Group>

                            <Button className = "form-button" variant="secondary" type="submit">
                                Continuar
                            </Button>

                        </Form>                
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterSeller