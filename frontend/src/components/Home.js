import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Search from './Search';
// import products from '../products';
import Product from './Product';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Nav,NavLink} from 'react-bootstrap';
import {FaFacebook, FaInstagram} from 'react-icons/fa';
import {useState, useContext, useEffect} from 'react';
import {dataContext} from './context/DataContext';


const Home = () => {
    const {data: products} = useContext(dataContext);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };

    const filteredProducts = products.filter((product) =>
      selectedCategory ? product.categoria === selectedCategory : true
    );

    useEffect(() => {
      AOS.init({duration: 2000,
        once: true,
        easing: 'ease-in-out',
        offset: 200,
      });
      
    },[]);
  
  return (
    <Container className="d-flex flex-column min-vh-100">
      <Row>
        <Col sm={12} md={6}>
          {/* <Search />  */}
          <Search onCategorySelect={handleCategorySelect} />
        </Col>
        <Col sm={12} md={6} className="d-flex flex-column">
          <h1 className="py-3 text-center flex-grow-1 sm-12" data-aos ="fade-right">
            Artículos hechos a mano que te encantarán
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <h1 className="py-3 text-center">
            {selectedCategory ? selectedCategory : 'Novedades'}
        </h1>
        <Container>
            <Row>
              {/* esto esta importado del componente Product, se recorre el array para mostrar cada producto */}
                {/* {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
                ))} */}
                {filteredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
        </Container>
        </Col>
      </Row>
      <Container>
        <h1 className="text-center py-3" data-aos = "fade-right">¿Quienes Somos?</h1>
        <Container className="nosotros">
          <Row>
            <Col>
              <p className="text-justify">
                Somos un espacio virtual que se dedica a la compra y venta de artículos hechos a mano por artistas de Chile. 
                Aquí puedes encontrar artículos exclusivos de decoración, ropa, joyas y mucho más.
                Nuestro objetivo es promover el trabajo de los artistas y ofrecer productos únicos que puedas llevar contigo.
              </p>
              <Row>
                <Col sm={12} md={4}>
                  <Card className="my-3 p-3 rounded" data-aos ="flip-right" sm={12} md={4}>
                    <Card.Img src="/img/variedad.png" variant="top" className="servicio img-fluid"/>
                    <Card.Body>
                      <Card.Title as="h3" className="text-center">
                        <strong>Variedad</strong>
                      </Card.Title>
                        <Card.Text as="div" className="text-center bg-secondary" variant="secondary">
                        Encuentra una gran variedad de productos para todos los gustos.
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} md={4}>
                  <Card className="my-3 p-3 rounded" data-aos ="flip-right" sm={12} md={4}>
                    <Card.Img src="/img/seguridad.png" variant="top" className="servicio img-fluid"/>
                    <Card.Body>
                      <Card.Title as="h3" className="text-center">
                        <strong>Seguridad</strong>
                      </Card.Title>
                        <Card.Text as="div" className="text-center bg-secondary" variant="secondary">
                        Compra de forma segura con diversos métodos de pago.
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={12} md={4}>
                  <Card className="my-3 p-3 rounded" data-aos ="flip-right" sm={12} md={4}>
                    <Card.Img src="/img/garantia.png" variant="top" className="servicio img-fluid"/>
                    <Card.Body>
                      <Card.Title as="h3" className="text-center">
                        <strong>Garantía</strong>
                      </Card.Title>
                        <Card.Text as="div" className="text-center bg-secondary" variant="secondary">
                        Vendedores verificados para generar confianza en tus compras.
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>

      <h1 className="text-center py-3">Contáctanos</h1>
      <Container className="contacto">
        <Row>
          <Col>
            <p className="text-center">
              Si tienes alguna duda o sugerencia, no dudes en contactarnos a través de nuestras redes sociales o a nuestro mail https://arteonlyne@gmail.com.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center"> 
        <Col className="text-center">
          <Nav className="justify-content-center">
            <NavLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social"/>
            </NavLink>
            <NavLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social"/>
            </NavLink>
          </Nav>
        </Col>
        </Row>
      </Container>
    </Container>
    
    
     )
}

export default Home