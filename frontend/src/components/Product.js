import React from 'react'
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';



const Product = ({product}) => {
  return (    
    <Card className="my-3 p-3 rounded">
        {/* se especifica la ruta con el id del producto, y se muestra la foto y lo mismo con el nombre */}
        <Link to={`/product/${product._id}`}>
        <div className="image-container">
            <Card.Img src={product.imagen}variant="top" className="img-fluid"/>
        </div>
        </Link>
        <Card.Body>
            <Link to ={`/product/${product._id}`} style={{ textDecoration: 'none'}}>
                <Card.Title as="div" className="product-name">
                    <strong>{product.nombre}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                {/* se importa el componente rating que contiene las estrellas y el numero de reviews */}
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as="h3">
            {`$${product.precio.toLocaleString('es-ES')}`}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product