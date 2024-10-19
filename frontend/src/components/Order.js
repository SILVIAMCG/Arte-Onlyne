import React from 'react'
import { cartContext } from './context/CartContext';
import { ListGroup, Button, Row, Col, Container, Card} from 'react-bootstrap';
import { useContext } from 'react';
import { orderRequest } from './api/order.js';
import Swal from 'sweetalert2';

const Order = () => {
    const {
        state: { cart },
        dispatch,
        cantidadDeProductos,
        subTotal
    } = useContext(cartContext);

    const showAlert = ()=>{Swal.fire({
        icon: "success",
        title: "¡Felicitaciones!",
        text: "Tu orden fue realizada con éxito",        
      });
    }

    const subtotal = subTotal();
    const costoEnvio = subtotal > 20000 || subtotal === 0 ? 0 : 2000;
    const totalPrecio = subtotal + costoEnvio;

    const handleOrder = async () => {
        try {
            const items = cart.map((item) => ({
                idProducto: item._id,
                cantidad: item.selectedQty,
            }));

            const data = {
                items,
                total: totalPrecio, 
            };

            const res = await orderRequest(data);
            console.log(res);
            if (res) {
                showAlert();
                dispatch({ type: "CLEAR_CART" });
            } else {
                console.log("Error al realizar la orden");
            }
        } catch (error) {
            console.error("Error al realizar la orden:", error);
        }
    };

  return (
    <Container>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Resumen de la orden</h2>
            </ListGroup.Item>
            <Card>
                <ListGroup variant="flush">
                    {cart &&
                        cart.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={4}>
                                        {item.nombre}
                                    </Col>
                                    <Col md={4}>${item.precio}</Col>
                                    <Col md={4}>
                                        Cantidad:
                                        {item.selectedQty}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Card>
        </ListGroup>



        <ListGroup variant="flush">
            <Row>
                <Col md={8}>
                    <h6>Subtotal productos({cantidadDeProductos()}) items</h6>
                    <h3>${subtotal}</h3>
                    <h6>Costo de envío</h6>
                    <h3>${costoEnvio}</h3>
                    <h4>Total</h4>
                    <h2>${totalPrecio}</h2>
                </Col>
            </Row>
        </ListGroup>
        <Button className = "form-button" variant="secondary" onClick={handleOrder}>Realizar orden</Button>
    </Container>

  )
}

export default Order