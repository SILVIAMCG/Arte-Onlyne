import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaSalesforce, FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header>
        <Navbar className="custom-navbar bg-primary" variant="primary" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand className= "navbar-brand">
                <img src={logo} alt="logo" className="logo me-3" />   
                Único y Diferente</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/carrito">
                        <Nav.Link>
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                        <Nav.Link>
                            <FaUser /> Iniciar Sesión
                        </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/vender">
                        <Nav.Link>
                            <FaUser /> Vende con nosotros
                        </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header