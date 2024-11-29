import {Navbar, Nav, Container, Dropdown, Button, Table} from 'react-bootstrap';
import {FaShoppingCart, FaTrash, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useEffect, useContext} from 'react';
import { userContext } from './context/DataContext';
import { IsSellerContext} from './context/ProductContext.js';
import { getProductFromSellerContext } from './context/ProductContext.js';
import { cartContext } from "./context/CartContext";
import {useNavigate} from 'react-router-dom';


const Header = () => {
    const { isLogged, logoutUser, isAuthenticated, checkAuthToken, isAdmin } = useContext(userContext);
    const {isSeller, permitSeller} = useContext(IsSellerContext);
    const {emptyProducts} = useContext(getProductFromSellerContext);
    const { state: { cart },cantidadDeProductos, dispatch } = useContext(cartContext);
    
    
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
    }, [isAuthenticated, isSeller]);
    

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
          <Navbar
          className="custom-navbar bg-primary"
          variant="primary"
          expand="lg"
          collapseOnSelect
          >
              <Container>
                  <LinkContainer to="/">
                      <Navbar.Brand className="navbar-brand">
                          <img src="/img/logo.png" alt="logo" className="logo me-3" />
                          ArteOnlyne
                      </Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ms-auto">

                          {!isAdmin && (
                              <Nav.Link>
                                  <Dropdown>
                                      <Dropdown.Toggle id="dropdown-basic" className="pt-0">
                                          <FaShoppingCart /> Carrito{" "}
                                          <strong>{cart.length === 0 ? null : cantidadDeProductos()}</strong>
                                      </Dropdown.Toggle>
                                      {cart.length === 0 ? (
                                          <Dropdown.Menu>
                                              <p
                                              className="text-center p-2 m-1"
                                              style={{ fontSize: "small" }}
                                              >
                                              Tu carrito está vacío
                                              </p>
                                          </Dropdown.Menu>
                                          ) : (
                                          <>
                                          <Dropdown.Menu style={{fontSize: "12px"}}>
                                              <Table hover>
                                                  <thead>
                                                      <tr>
                                                          <th>Cant</th>
                                                          <th>Item</th>
                                                          <th>{null}</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      {cart.map((item, index) => (
                                                          <tr key={index}>                            
                                                              <td>{item.selectedQty}</td>
                                                              <td>{item.nombre}</td>
                                                              <td> 
                                                                  <Button
                                                                  type="button"
                                                                  style={{
                                                                      fontSize: "small",
                                                                      color: "red",
                                                                      backgroundColor: "white",
                                                                      border: "none",
                                                                      boxShadow: "none",
                                                                      padding: "0px",
                                                                      margin: "0px",
                                                                      }}
                                                                  className="p-0 m-0"
                                                                  onClick={() =>
                                                                      dispatch({
                                                                          type: "REMOVE_FROM_CART",
                                                                          payload: item._id, 
                                                                          })
                                                                        }
                                                                        >
                                                                      <FaTrash />
                                                                  </Button>
                                                              </td>
                                                          </tr>
                                                      ))}
                                                  </tbody>
                                              </Table>
                                              <hr />
                                              <Dropdown.Item>
                                                  <LinkContainer to="/carrito">
                                                      <Nav.Link>
                                                          <FaShoppingCart /> Ir al carrito
                                                      </Nav.Link>
                                                  </LinkContainer>
                                              </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </>
                                        )}
                                  </Dropdown>
                              </Nav.Link>
                            )}
                            {/* Si el usuario esta logeado, se muestra cerrar sesion, si no, iniciar sesion */}
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

                            {!isAdmin && (
                            isLogged && permitSeller ? (
                                <Nav.Link onClick={handleUploadProductClick}>
                                    <FaUser /> Mis Productos
                                </Nav.Link>
                                ) : (
                                <Nav.Link onClick={handleVenderClick}>
                                    <FaUser /> Vende con nosotros
                                </Nav.Link>
                                )
                            )}
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
    );
}

export default Header;