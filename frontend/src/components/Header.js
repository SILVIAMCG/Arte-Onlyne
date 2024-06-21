import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaSalesforce, FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
// import logo from '../images/logo.png';
import {loginRequest, logoutRequest} from './api/auth.js';
import {useState, useEffect, useContext} from 'react';
import { userContext } from './context/DataContext';
import {useNavigate} from 'react-router-dom';


const Header = () => {

    // const [logged, setLogged] = useState(false);

    // const isLogged = async () => {
    //     try{
    //         const res = await loginRequest();
    //         setLogged(true);
    //         console.log(res);
    //     }catch (error){
    //         console.error("Error iniciando sesión:", error);
    //     }
    // };
    const { isLogged, loginUser, logoutUser } = useContext(userContext);
    const navigate = useNavigate();


    // const logged = () => {
    //     const isAuthenticated = loginUser();
    //     if (isAuthenticated){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    

    const handleLogged = async() => {
        try{
        await logoutUser();
        navigate('/login');

        }catch (error){
            console.error("Error cerrando sesión:", error);
        }
    };

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
                <img src="img/logo.png" alt="logo" className="logo me-3" />   
                ArteOnlyne</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/carrito">
                        <Nav.Link>
                            <FaShoppingCart /> Carrito
                        </Nav.Link>
                     </LinkContainer>
                            {isLogged ? (
                                <Nav.Link onClick={handleLogged}>

                                    <FaUser /> Cerrar Sesión
                                </Nav.Link>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Iniciar Sesión
                                    </Nav.Link>
                                </LinkContainer>
                            )}
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