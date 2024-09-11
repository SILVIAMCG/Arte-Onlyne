
import { useContext, useState, useEffect } from 'react';
import { sellProductContext } from './context/ProductContext';
import React from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';




const ProductForm = () => {

  const {register, handleSubmit, formState: { errors },reset} = useForm();
  const [errorMessage, setErrorMessage] = useState('');   
  const { uploadProduct } = useContext(sellProductContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async (data) => {
    const productData = {
        ...data,
        imagen: selectedImage // Añade la imagen al producto
    };


    const uploadedProduct = await uploadProduct(productData);
    if (uploadedProduct) {
        reset(); 
        }
    };
    

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]); // Guarda la imagen seleccionada
    };


    const handleInputChange = () => {
        setErrorMessage(''); 
    };

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <Card className="my-5 p-3">
                    <h2 className="text-center">Completa las características del producto</h2>
                    
                    <Form className = "form" onSubmit = {handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa nombre del producto"{...register ("nombre", {required: true})} onChange={handleInputChange}/>
                        {errors.nombre && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

    
                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" {...register("imagen", { required: true })} onChange={handleImageChange} />
                            {errors.imagen && <span className="text-danger">Este campo es obligatorio</span>}
                        </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select {...register("categoria", { required: true })} onChange={handleInputChange}
                            >
                                <option value="">Selecciona</option>
                                <option value="Accesorios">Accesorios</option>
                                <option value="Bisuteria">Bisutería</option>
                                <option value="Cuadros y Pinturas">Cuadros y Pinturas</option>
                                <option value="Decoración">Decoración</option>
                                <option value="Hogar">Hogar</option>
                                <option value="Moda">Moda</option>
                                <option value="Papelería">Papelería</option>
                                <option value="Otros">Otros</option>
                            </Form.Select>
                            {errors.categoria && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa descripción" {...register ("descripcion", {required: true})} onChange={handleInputChange}/>
                        {errors.descripcion && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" placeholder="Ingresa precio" {...register ("precio", {required: true})} onChange={handleInputChange}/>
                        {errors.precio && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" placeholder="Ingresa número de stock" {...register ("stock", {required: true})} onChange={handleInputChange}/>
                        {errors.stock && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

                    {/* ESTOS CAMPOS NO SE ESTAN UTILIZANDO EN EL FORM PARA QUE VENGAN DE LA COLECCION DE VENDEDORES */}

                    {/* <Form.Group className="mb-3" controlId="formBasicCreador">
                        <Form.Label>Creador</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa nombre de creador" {...register ("creador", {required: true})} onChange={handleInputChange}/>
                        {errors.creador && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu contacto en RRSS" {...register ("contacto", {required: true})} onChange={handleInputChange}/>
                        {errors.contacto && <span className="text-danger">Este campo es obligatorio</span>} 
                    </Form.Group> */}

                    <Button className = "form-button" variant="secondary" type="submit">
                        Subir Producto
                    </Button>

                    </Form>                
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductForm