import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';

const Header = () => {
  return (
    <header>
        <Navbar className="custom-navbar" bg="secondary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Único y Diferente</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/carrito">
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <FaUser /> Iniciar Sesión
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header