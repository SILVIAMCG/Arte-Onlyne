import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaSalesforce, FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useState, useEffect, useContext} from 'react';
import { userContext } from './context/DataContext';
import { sellerContext } from './context/SellerContext.js';
import { IsSellerContext, sellProductContext } from './context/ProductContext.js';
import { getProductFromSellerContext } from './context/ProductContext.js';
import {useNavigate} from 'react-router-dom';


const Header = () => {
    //AQUI SE HICIERON VARIAS PRUEBAS PARA PODER CAMBIAR LA BARRA DE NAVEGACION DEPENDIENDO DE SI ESTA LOGEADO EL USUARIO
    //Y ADEMAS PARA QUE PUEDA ACCEDER AL FORMULARIO DE REGISTRO DEL VENDEDOR SI ESTA LOGEADO, Y SI NO NO
    const { isLogged, loginUser, logoutUser, isAuthenticated, checkAuthToken } = useContext(userContext);
    const {isSeller, permitSeller} = useContext(IsSellerContext);
    const {emptyProducts} = useContext(getProductFromSellerContext);
    const { uploadProduct } = useContext(sellProductContext);
    const { sellerInfo, isCompleted } = useContext(sellerContext);
    const navigate = useNavigate();

    //VERIFICA SI EL USUARIO ESTA LOGEADO
    useEffect(() => {
        checkAuthToken();
    }, [checkAuthToken]);

    //ESTO VERIFICA SI EL USUARIO ES VENDEDOR, VIENE DE PRODUCT CONTEXT
    useEffect(() => {
        if (isAuthenticated) {
            isSeller(); 
        }
    }, [isAuthenticated]);
    

    //Para cuando el usuario cierre sesion
    const handleLogged = async() => {
        try{
        await logoutUser();
        emptyProducts();
        window.location.replace('/login');

        }catch (error){
            console.error("Error cerrando sesión:", error);
        }
    };

    const handleVenderClick = () => {
        console.log('isAuth desde el header', isAuthenticated);
        console.log ('permitSeller desde el header', permitSeller);
        navigate('/vender');
    };


    const handleUploadProductClick = () => {
        navigate('/misproductos');
    };
    
  return (
    <header>
        <Navbar className="custom-navbar bg-primary" variant="primary" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand className= "navbar-brand">
                <img src="/img/logo.png" alt="logo" className="logo me-3" />   
                ArteOnlyne</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/carrito">
                        <Nav.Link>
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                    {/* Si el usuario esta logeado, se muestra cerrar sesion, si no, iniciar sesion */}
                     </LinkContainer>
                            {isLogged ?(
                                <Nav.Link onClick={handleLogged}>
                                    <FaUser /> Cerrar Sesión
                                </Nav.Link>
                            ) 
                            : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Iniciar Sesión
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                        {isLogged && permitSeller ?(
                            <Nav.Link onClick={handleUploadProductClick}>
                                <FaUser /> Mis Productos
                            </Nav.Link>
                        ) :(
                        
                        <Nav.Link onClick={handleVenderClick}>
                            <FaUser /> Vende con nosotros
                        </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header