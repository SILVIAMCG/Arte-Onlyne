import React from 'react'
import { cartContext } from './context/CartContext';
import { ListGroup, Button, Row, Col, Container, Card, Image} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { orderRequest } from './api/order.js';
import Swal from 'sweetalert2';
import Result from './Result';

const Order = () => {
    const [resultado, setResultado] = useState(null);
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
                totalPrecio, 
                costoEnvio
            };

            const res = await orderRequest(data);
            console.log(res);
            if (res) {
                setResultado(res);
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
        <>
        {resultado !== null ? <Result result={resultado}/> : 
        <Container>
            <ListGroup className="my-3" variant="flush">
                <ListGroup.Item>
                    <h2>Resumen de la orden</h2>
                </ListGroup.Item>
                <Card>
                    <ListGroup variant="flush">
                        {cart &&
                            cart.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.imagen.secure_url}
                                                alt={item.nombre}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            {item.nombre}
                                        </Col>
                                        <Col md={3}>${item.precio}</Col>
                                        <Col md={3}>
                                            Cantidad:
                                            {item.selectedQty}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Card>
            </ListGroup>
    
    
            <Container>
            <ListGroup className="my-3" variant="flush">
                <Row>
                    <Col md={8}>
                        <h6>Subtotal productos({cantidadDeProductos()}) items</h6>
                        <h3>${subtotal}</h3>
                        <h6>Costo de envío</h6>
                        <h3>${costoEnvio}</h3>
                        <h4>Total</h4>
                        <h2>${totalPrecio}</h2>
                    </Col>

                    <Col md={4}>
                        <Button className="btn btn-secondary my-3" onClick={handleOrder}>
                            <strong>Realizar orden</strong>
                        </Button>
                    </Col>
                </Row>
            </ListGroup>
            </Container>
            {/* formulario de datos de envío */}
    
            {/* <Button className = "form-button" variant="secondary" onClick={handleOrder}>Realizar orden</Button> */}
        </Container>}
        </>
      );
}

export default Order