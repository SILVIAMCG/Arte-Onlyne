
import { useContext, useState, useEffect } from 'react';
import { getProductFromSellerContext } from './context/ProductContext';
import React from 'react';
import {Container, Row, Col, Card, Form, Button, ListGroup, Image, ListGroupItem, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment';
import FormHandle from './FormHandle';




const ProductForm = () => {

    const {myProducts, productsFromSeller, getProductById, deleteProduct} = useContext(getProductFromSellerContext);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null)
    const [dataUpdate, setDataUpdate] = useState(null)

    const handleClose = () => {
        setProductToUpdate(null);
        setShow(false)
    };

    const handleShow = () => setShow(true);
    const handleUpdate = async (productId) => {
        const product = await getProductById(productId);
        setProductToUpdate(product);
        handleShow();
    };


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

    useEffect(()=> {
        setDataUpdate(productToUpdate);
    }, [productToUpdate])



    if (loading) {
        return <p>Cargando productos...</p>;
    }


    if (!productsFromSeller) {
        return <h2>Aún no tienes productos publicados</h2>;
    }


    const handleDelete = (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(productId);
                Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado',
                'success'
            );
            }
        })
    };
     
    return (
        <Container className="d-flex flex-column">
            <Row>
               <Col>
                   <div className="text-dark py-3">
                       <Button onClick={() => handleShow()}>Agregar un nuevo producto</Button>
                   </div>
               </Col>
           </Row>
   
            <Row>
               <Col>
                   <div className="bg-secondary text-dark py-3">
                       {productsFromSeller.length > 0 ? (
                           <h2 className="text-center">Mis productos en venta</h2>
                       ) : (
                           <>
                           <h2 className="text-center">Aún no tienes productos en venta</h2>
                           </>
                       )}
                   </div>
               </Col>
           </Row>
           
           <ListGroup variant="flush" className='flex-1'>
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
                           <Button variant="success" className="d-flex align-items-center" onClick={()=>handleUpdate(product._id)}>
                               <FaPencilAlt className="me-2" />
                               Editar
                           </Button>
                           
                           <Button variant="danger" className="d-flex align-items-center" onClick={() => handleDelete(product._id)}>
                               <FaTrashAlt className="me-2" />
                               Eliminar
                           </Button>
                           </div>
                           </Col>
                       </Row>
                    </ListGroupItem>               
               ))}
           </ListGroup>
           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>{productToUpdate !== null ? `Estas actualizando el producto id: ${productToUpdate._id} `: `Ingresa un nuevo producto`}</Modal.Title>
           </Modal.Header>
           <Modal.Body className='bg-primary'>
               {/* Componente que recibe los datos para actualizar o para crear un nuevo producto */}
               <FormHandle data={productToUpdate} closeHandle={setShow} productoToFalse={setProductToUpdate} />
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
               Close
             </Button>
           </Modal.Footer>
         </Modal>
       </Container>
     )
   }
   
   export default ProductForm