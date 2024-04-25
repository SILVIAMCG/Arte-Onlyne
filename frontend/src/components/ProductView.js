import React from 'react'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Container} from 'react-bootstrap';
import Rating from './Rating';
import Select from 'react-select';
// import products from '../products';
import {useContext} from 'react';
import {dataContext} from './context/DataContext';



//este componente es la vista del detalle de los productos
const ProductView = () => {
    //se obtiene el contexto
    const {data: products} = useContext(dataContext);

    const handleSelect = ({value}) => {
        console.log(value)
    }

    
    //Se obtiene el id con params, se busca el producto con el id y se guarda en la variable product
    
    const {id:productId} = useParams();
    const product = products.find(p => p._id === productId);
    console.log(product);
    const cantidad = Array.from({ length: product.countInStock }, (_, index) => ({
        label: (index + 1).toString(),
        value: (index + 1).toString()
    }));
  return (
    <Container>
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Precio: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descripción: {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                    Fabricado por: {product.artist}
                </ListGroup.Item>
                <ListGroup.Item>
                    Contacto: {product.contact}
                </ListGroup.Item>
            </ListGroup>
            <Link className ="btn btn-primary my-3" to="/">Volver</Link>
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
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Disponible:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'En Stock' : 'Sin Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {/* si el producto no esta disponible, o sea es 0, se deshabilita el boton */}
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
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
            
        </Col>
    </Row>
    </Container>
  )
 }

export default ProductView