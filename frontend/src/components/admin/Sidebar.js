import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Sidebar = () => {
    return (        
        <ListGroup variant="flush" className="bg-primary">
            <ListGroup.Item className="bg-primary">
              Autorizaciones
            </ListGroup.Item>
            <ListGroup.Item className="bg-primary">
              Usuarios
            </ListGroup.Item>
            <ListGroup.Item className="bg-primary">
              Productos
            </ListGroup.Item>
        </ListGroup>

      );
}

export default Sidebar