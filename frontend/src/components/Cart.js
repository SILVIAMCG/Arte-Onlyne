import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';


const Cart = () => {
  return (
    <>
    <Row>
        <Col md={8}>
            <h1>Carrito de Compras</h1>
        </Col>
    </Row>
    <Link className ="btn btn-primary my-3" to="/">Volver</Link>
    </>
  )
  
}

export default Cart