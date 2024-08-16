import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaSalesforce, FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {loginRequest, logoutRequest} from './api/auth.js';
import {useState, useEffect, useContext} from 'react';
import { userContext } from './context/DataContext';
import { sellerContext } from './context/SellerContext.js';
import { sellProductContext } from './context/ProductContext.js';
import {useNavigate} from 'react-router-dom';




const Header = () => {
    //AQUI SE HICIERON VARIAS PRUEBAS PARA PODER CAMBIAR LA BARRA DE NAVEGACION DEPENDIENDO DE SI ESTA LOGEADO EL USUARIO
    //Y ADEMAS PARA QUE PUEDA ACCEDER AL FORMULARIO DE REGISTRO DEL VENDEDOR SI ESTA LOGEADO, Y SI NO NO
    const { isLogged, loginUser, logoutUser, isAuthenticated } = useContext(userContext);
    const { permitSeller, isSeller } = useContext(sellProductContext);
    const { sellerInfo, isCompleted } = useContext(sellerContext);
    const navigate = useNavigate();


    

    //Para cuando el usuario cierre sesion
    const handleLogged = async() => {
        try{
        await logoutUser();
        navigate('/login');

        }catch (error){
            console.error("Error cerrando sesión:", error);
        }
    };

    const handleVenderClick = () => {
        console.log('isAuth desde el header', isAuthenticated);
        console.log ('permitSeller desde el header', permitSeller);
        navigate('/vender');
    };

    useEffect(() => {
        if (isAuthenticated) {
            isSeller();
        }
    }, [isAuthenticated, isSeller]);



    const handleUploadProductClick = () => {
        console.log('permit seller desde el header', permitSeller);
        navigate('/misproductos');
    };
    //ESTAS SON PRUEBAS, POR EL MOMENTO NO SE ESTAN USANDO
    // const handleSellerData = async() => {
    //     try{
    //        await navigate('/vender');
    //     }catch (error){
    //         console.error("Error registrando datos de vendedor:", error);
    //     }
    // };

    // useEffect(() => {
    //     console.log("useEffect isLogged called");
    //     isLogged();
    // }, []);

    // useEffect(() => {
    //     console.log("Logged state changed:", logged); 
    // }, [logged]);


  return (
    <header>
        <Navbar className="custom-navbar bg-primary" variant="primary" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand className= "navbar-brand">
                {/* <img src={logo} alt="logo" className="logo me-3" />    */}
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

                        {/* Si el usuario esta logeado, se muestra el formulario de ingresar datos de vendedor, si no, el login        
                                                 */}  
                        {/* {isLogged ? (
                                <LinkContainer to="/vender">
                                    <Nav.Link>
                                        <FaUser /> Vende con nosotros
                                    </Nav.Link>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Vende con nosotros
                                    </Nav.Link>
                                </LinkContainer>
                            )}              
                                                   */}
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