import React from 'react'
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Container} from 'react-bootstrap';
// import Rating from './Rating';
import Select from 'react-select';
// import products from '../products';
import {useContext, useState, useEffect} from 'react';
import {dataContext} from './context/DataContext';
import { getProductDetailContext } from './context/ProductContext';
import { cartContext } from './context/CartContext';




//este componente es la vista del detalle de los productos
 const ProductView = () => {

    //TODO ESTO ERA LA FORMA ANTIGUA DE MOSTRAR EL PRODUCTO, SE CAMBIO POR EL DE ABAJO
//     const {data: products} = useContext(dataContext);

//     const handleSelect = ({value}) => {
//     console.log(product.imagen);
//     }

    
    //Se obtiene el id con params, se busca el producto con el id y se guarda en la variable product
    
    // const {id:productId} = useParams();
    // const product = products.find(p => p._id === productId);
    // console.log(product);
    // const cantidad = Array.from({ length: product.stock }, (_, index) => ({
    //     label: (index + 1).toString(),
    //     value: (index + 1).toString()
    // }));

    //FIN FORMA ANTIGUA


    //ESTO ES LO NUEVO
    const {dispatch} = useContext(cartContext); 
    const { id: productId } = useParams(); // Obtén el ID del producto de los parámetros de la URL
    const { getOneProduct, productDetail } = useContext(getProductDetailContext); // Accede al contexto
    const [loading, setLoading] = useState(true); // Estado de carga
    const [selectedQty, setSelectedQty] = useState(1); 

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); 
            await getOneProduct(productId);  //se espera que se obtenga el producto
            //setLoading(false); 
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

    //NOTA, EN EL COMPONENTE, SE CAMBIO EL PRODUCT POR PRODUCTDETAIL, YA QUE SE ESTA USANDO EL PRODUCTDETAIL
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

                {/* NO SE UTILIZA review */}
                {/* <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item> */}

                <ListGroup.Item>
                    Precio: ${productDetail.precio}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descripción: {productDetail.descripcion}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                    Fabricado por: {product.creador}
                </ListGroup.Item>
                <ListGroup.Item>
                    Contacto: {product.contacto}
                </ListGroup.Item> */}
            </ListGroup>
            {/* <Link className ="btn btn-primary my-3" to="/">Volver</Link> */}
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