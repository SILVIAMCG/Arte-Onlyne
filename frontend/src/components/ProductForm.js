
import { useContext, useState, useEffect } from 'react';
import { sellProductContext,getProductFromSellerContext } from './context/ProductContext';
import React from 'react';
import {Container, Row, Col, Card, Form, Button, ListGroup, Table, Image, ListGroupItem} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment';




const ProductForm = () => {

  const {myProducts, productsFromSeller} = useContext(getProductFromSellerContext);
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors },reset} = useForm();
  const [errorMessage, setErrorMessage] = useState('');   
  const { uploadProduct } = useContext(sellProductContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
    const fetchMyProducts = async () => {
        setLoading(true);
        await myProducts();
    };
    fetchMyProducts();
   }, [myProducts]);

   useEffect(() => {
    //si el producto ya esta cargado, se cambia el estado de loading
    if (productsFromSeller) {
        setLoading(false); 
    }
}, [productsFromSeller]);


if (loading) {
    return <p>Cargando productos...</p>;
}


if (!productsFromSeller) {
    return <h2>Aún no tienes productos publicados</h2>;
}

  const onSubmit = async (data) => {
    const productData = {
        ...data,
        imagen: selectedImage // Añade la imagen al producto
    };


    const uploadedProduct = await uploadProduct(productData);
    try{
    if (uploadedProduct) {
        showAlert();
        navigate('/');
        reset();
        setErrorMessage(''); 
        }
    } catch (error) {
        console.error("Error subiendo producto:", error);
        setErrorMessage("Error subiendo producto");
        reset();
    }
};
    

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]); // Guarda la imagen seleccionada
    };


    const handleInputChange = () => {
        setErrorMessage(''); 
    };

    const showAlert = ()=>{Swal.fire({
        icon: "success",
        title: "¡Felicitaciones!",
        text: "Tu producto ya se encuentra publicado",        
      });

    }

  return (
     <Container>
        {/* {productsFromSeller.length > 0 ? <h2 className="text-center">Mis productos en venta</h2>
         : <h2 className="text-center">Aún no tienes productos en venta</h2>} */}
         <Row>
            <Col>
                <div className="bg-secondary text-dark py-3">
                    {productsFromSeller.length > 0 ? (
                        <h2 className="text-center">Mis productos en venta</h2>
                    ) : (
                        <h2 className="text-center">Aún no tienes productos en venta</h2>
                    )}
                </div>
            </Col>
        </Row>
        
        <ListGroup variant="flush">
            {productsFromSeller.map((product) => (
                // return(
                 <ListGroupItem key={product._id} className="py-2 px-3">
                    <Row className="align-items-center">
                        <Col md={2}>
                        <div className="image-container" style={{ maxWidth: '100px', maxHeight: '100px', overflow: 'hidden' }}>
                            <Image src={product.imagen.secure_url} alt={product.nombre} fluid rounded/>
                        </div>
                        </Col>

                        <Col md={3}>
                            <p className='text-sm-center'>{product.nombre}</p>
                        </Col>

                        <Col md={3}>
                            <p className='text-sm-center'>{product.createdAt ? moment(product.createdAt).format('DD/MM/YYYY') : "Fecha no disponible"}</p>
                        </Col>

                        <Col md={4}>
                        <div className="d-flex justify-content-center justify-content-md-start gap-4">
                        <Button variant="success" className="d-flex align-items-center">
                            <FaPencilAlt className="me-2" />
                            Editar
                        </Button>
                        
                        <Button variant="danger" className="d-flex align-items-center">
                            <FaTrashAlt className="me-2" />
                            Eliminar
                        </Button>
                        </div>
                        </Col>
                    </Row>
                 </ListGroupItem>



                
            ))}
        </ListGroup>



{/* <Table striped bordered hover responsive className = "table-sm">
                                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                    {productsFromSeller.map((product) => {
                        return (
                            <tr key={product._id} variant="flush">
                                <td><Image src={product.imagen.secure_url} alt={product.nombre} className="img-fluid" style={{ maxWidth: '100px', height: 'auto' }}/></td>                                
                                <td>{product.nombre}</td>                                
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>

 */}

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