import React from 'react';
import { Link } from 'react-router-dom'; 
import { ListGroup, Button, Row, Col, Image, Container, Card} from 'react-bootstrap';
import Select from 'react-select';
import { FaFrown, FaSmile} from 'react-icons/fa';
import { useContext } from 'react';
import { getProductDetailContext } from './context/ProductContext';
import { cartContext } from './context/CartContext';


const Cart = () => {

  const { state: { cart }, dispatch } = useContext(cartContext);
  return (
    <>
    <div className="bg-secondary text-dark py-3">
        {cart.length === 0 ? (
            <h2 className="text-center">Tu carrito está vacío <FaFrown></FaFrown></h2>
          ) : (
            <h2 className="text-center">Carrito de Compras <FaSmile></FaSmile></h2>
                    )}
        </div>

        <Container>
            <ListGroup variant="flush">
                {cart.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.imagen.secure_url} alt={item.nombre} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item._id}`}>{item.nombre}</Link>
                            </Col>
                            <Col md={2}>${item.precio}</Col>
                            <Col md={2}>Cantidad: 
                            {/* ESTO ES PARA PROBAR */}
                            <Select
                              value={{ label: item.selectedQty.toString(), value: item.selectedQty.toString() }}
                              onChange={({ value }) => dispatch({
                                type: 'UPDATE_CART_QTY',
                                payload: { _id: item._id, selectedQty: Number(value) }
                               })}
                              options={Array.from({ length: item.stock }, (_, index) => ({
                               label: (index + 1).toString(),
                               value: (index + 1).toString(),
                              }))}
                            />
                            </Col>
                            <Col md={2}>
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => dispatch({
                                        type: 'REMOVE_FROM_CART',
                                        payload: item._id, // Pasar el ID del producto para eliminarlo
                                    })}
                                >
                                    <i className="fas fa-trash"></i> Eliminar
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Card className='bg-secondary'>
              <Card.Body>
                <ListGroup variant="flush">
                  <Row>
                    <Col md={8}> 
                        <h6>Subtotal productos({cart.reduce((acc, item) => acc + item.selectedQty, 0)}) items</h6>                
                        <h3>
                        ${cart.reduce((acc, item) => acc + item.selectedQty * item.precio, 0)}
                        </h3>
                        <h6>Costo de envío</h6>
                        <h3>
                        ${cart.reduce((acc, item) => acc + item.selectedQty * item.precio, 0) > 20000 ? 0 : 2000}
                        </h3>
                        <h4>Total</h4>
                        <h2>
                        ${cart.reduce((acc, item) => acc + item.selectedQty * item.precio, 0) + (cart.reduce((acc, item) => acc + item.selectedQty * item.precio, 0) > 20000 ? 0 : 2000)}
                        </h2>
                    </Col>


                    <Col md={4}>
                        <Link to="/" className="btn btn-primary my-3"><strong>Ir al Pago</strong></Link>
                    </Col>
                    </Row>
                </ListGroup>
                </Card.Body>
            </Card>
            
        </Container>
    </>
  )
  
}

export default Cart