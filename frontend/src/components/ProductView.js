import React from 'react'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Container} from 'react-bootstrap';
import Select from 'react-select';
import {useContext, useState, useEffect} from 'react';
import { getProductDetailContext } from './context/ProductContext';
import { cartContext } from './context/CartContext';

//este componente es la vista del detalle de los productos
 const ProductView = () => {

    const {dispatch} = useContext(cartContext); 
    const { id: productId } = useParams(); 
    const { getOneProduct, productDetail } = useContext(getProductDetailContext); 
    const [loading, setLoading] = useState(true); 
    const [selectedQty, setSelectedQty] = useState(1); 

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); 
            await getOneProduct(productId);  
        };
        //se ejecuta la funcion
        fetchProduct();
        //esto hace que se ejecute la funcion cada vez que cambie el id
    }, [productId, getOneProduct]); 

    useEffect(() => {
        //si el producto ya esta cargado, se cambia el estado de loading
        if (productDetail) {
            setLoading(false); 
        }
    }, [productDetail]);

    
    if (loading) {
        return <p>Cargando producto...</p>;
    }

    
    if (!productDetail) {
        return <p>Producto no encontrado</p>;
    }

    // Opciones de cantidad basadas en el stock
    const cantidad = Array.from({ length: productDetail.stock }, (_, index) => ({
        label: (index + 1).toString(),
        value: (index + 1).toString()
    }));

    const handleSelect = ({ value }) => {
        setSelectedQty(Number(value));
    };

  return (
    <Container>
    <Row>
        <Col md={5}>
            <Image src={productDetail.imagen.secure_url} alt={productDetail.nombre} fluid />
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{productDetail.nombre}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    Precio: ${productDetail.precio}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descripción: {productDetail.descripcion}
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Precio:
                            </Col>
                            <Col>
                                <strong>${productDetail.precio}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Disponible:
                            </Col>
                            <Col>
                                {productDetail.stock > 0 ? 'En Stock' : 'Sin Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {/* si el producto no esta disponible, o sea es 0, se deshabilita el boton */}
                        <Button className="btn-block" type="button" disabled={productDetail.stock === 0} onClick={()=>dispatch(
                            {type: 'ADD_TO_CART',product: {...productDetail, selectedQty}}
                        )}>
                            Añadir al Carrito
                        </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Select
                            defaultValue={{ label: 'Cantidad', value: 'Default' }}
                            onChange={handleSelect}
                            options={cantidad}
                        />
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            <Link className ="btn btn-primary my-3" to="/">Volver</Link>
            
        </Col>
    </Row>
    </Container>
  )
 }

export default ProductView