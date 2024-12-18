import React from 'react'
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Product = ({product}) => {
  return (    
    <Card className="my-3 p-3 rounded">
        {/* se especifica la ruta con el id del producto, y se muestra la foto y lo mismo con el nombre */}
        <Link to={`/product/${product._id}`}>
        <div className="image-container">
            <Card.Img src={product.imagen.secure_url}variant="top" className="img-fluid"/>
        </div>
        </Link>
        <Card.Body>
            <Link to ={`/product/${product._id}`} style={{ textDecoration: 'none'}}>
                <Card.Title as="div" className="product-name">
                    <strong>{product.nombre}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="h3">
            {`$${product.precio.toLocaleString('es-ES')}`}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product