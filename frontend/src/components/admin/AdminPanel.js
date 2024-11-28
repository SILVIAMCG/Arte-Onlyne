import React from 'react'
import { Container, Row, Col,Table, Button } from 'react-bootstrap';
import { usersRequest, deleteUserAndAssociationsRequest, getProductsRequest, deleteProductRequest, approveProductRequest, rejectProductRequest, getPendingProductsRequest} from '../api/admin';
import { useState, useEffect } from 'react';
import Select from 'react-select'; 
import Swal from 'sweetalert2';
import moment from "moment";

//Se setean los estados
const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchUser, setSearchUser] = useState(null);
    const [searchProduct, setSearchProduct] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);
  
  //aparece la lista de usuarios al cargar el componente
    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await usersRequest();
                setUsers(res);
                //aparecen solo 5 usuarios, para que la lista no sea tan larga
                setFilteredUsers(res.slice(-5));
            }catch (error) {
                console.error("Error al obtener usuarios:", error);
              }
          };
        getUsers();
      }, []);
  
    //lo mismo anterior pero con productos
    useEffect(() => {
        const getProducts = async () => {
            try{
                const res = await getProductsRequest();
                setProducts(res);
                setFilteredProducts(res.slice(-5));
            }catch (error) {
                console.error("Error al obtener productos:", error);
              }
          };
        getProducts();
    }, []);
  

    //barra de busqueda para usuarios, se buscan por el mail
    useEffect(() => {
        if (searchUser) {
            const foundUser = users.find((user) => user.email === searchUser.value);
            setFilteredUsers(foundUser ? [foundUser] : []);
        }else {
            setFilteredUsers(users.slice(-5));
          }
      }, [searchUser, users]);
  
    //Funcion para cargar la opcion de productos pendientes por aprobar
    const getPendingProducts = async () => {
        try{
            const res = await getPendingProductsRequest();
            setPendingProducts(res);
      }catch (error) {
            console.error("Error al obtener productos pendientes:", error);
        }
    };
  
    //se ejecuta al cargar el componente
    useEffect(() => {
        getPendingProducts();
      }, []);
  
    //opciones para usar en la busqueda de usuario
    const options = users.map((user) => ({
        value: user.email,
        label: user.email,
      }));
  
    useEffect(() => {
        if (searchProduct) {
            const foundProduct = products.find(product => product.nombre === searchProduct.value);
            setFilteredProducts(foundProduct ? [foundProduct] : []);
        } else {
            setFilteredProducts(products.slice(-5));
        }
    },[searchProduct, products]);
  
    const productOptions = products.map((product) => ({
        value: product.nombre,
        label: product.nombre,
    }));
  
    //funcion para eliminar usuario
    const handleDelete = async (id) => {
        try{
            const result = await showAlert(
            "Esta acción eliminará todo lo asociado al ítem",
            "Eliminar"
            );
            if (result.isConfirmed) {
                await deleteUserAndAssociationsRequest(id);
                const res = await usersRequest();
                setUsers(res);
                setFilteredUsers(res.slice(-5));
              }
        }catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };
  
    //funcion para eliminar producto
    const handleDeleteProduct = async (id) => {
        try{
            const result = await showAlert(
            "Esta acción eliminará todo lo asociado al ítem",
            "Eliminar"
            );
            if (result.isConfirmed) {
                await deleteProductRequest(id);
                const res = await getProductsRequest();
                setProducts(res);
                setFilteredProducts(res.slice(-5));
            }
        }catch (error) {
            console.error("Error al eliminar producto:", error);
        }
      };
  
    
    const handleAproveProduct = async (id) => {
        try{
            const result = await showAlert(
            "Esta acción aprobará el producto",
            "Autorizar"
            );
            if (result.isConfirmed) {
                await approveProductRequest(id);
                getPendingProducts();
              }
        }catch (error) {
            console.error("Error al aprobar producto:", error);
        }
    };
  

    const handleRejectProduct = async (id) => {
        try{
            const result = await showAlert(
            "Esta acción rechazará el producto",
            "Rechazar"
            );
            if (result.isConfirmed) {
                await rejectProductRequest(id);
                getPendingProducts();
              }
        }catch(error) {
            console.error("Error al rechazar producto:", error);
            }
        };
  
    const showAlert = (text, confirmButtonText) => {
        return Swal.fire({
            title: "¿Estás seguro?",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText,
        });
    };
  
    return (
      <Container>
          <Container fluid className="py-4 border border-dark rounded mb-4">
              <Row>
                  <Col>
                      <h3 className="text-center mb-4">Panel de Administrador</h3>
                  </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Productos por gestionar</h3>
                    <Button onClick={getPendingProducts}>
                        Productos por aprobar {pendingProducts.length}
                    </Button>
                </Col>
            </Row>
            </Container>
                <Container fluid className="py-4 border border-dark rounded">
                    <Row>
                        <Col>
                            <h3 className="text-center mb-4">Autorizaciones Pendientes</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Imagen</th>
                                        <th>Fecha</th>
                                        <th>Vendedor</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingProducts.length > 0 ? (
                                    pendingProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.nombre}</td>
                                            <td>
                                                <img src={product.imagen.secure_url} alt={product.nombre} style={{ width: "100px" }}/>
                                            </td>
                                            <td>
                                                <p className="text-sm-center"> 
                                                  {product.createdAt ? moment(product.createdAt).format("DD/MM/YYYY")
                                                  : "Fecha no disponible"}
                                                </p>
                                            </td>
                                            <td>{product.usuario}</td>
                                            <td>
                                                <button className="btn btn-warning mx-3 my-2" onClick={() => handleAproveProduct(product._id)}>
                                                    Autorizar
                                                </button>
                                                <button className="btn btn-danger mx-3 my-2" onClick={() => handleRejectProduct(product._id)}>
                                                    Rechazar
                                                </button>
                                            </td>
                                        </tr>
                                      ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No hay productos pendientes
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
              </Container>
  
              <Container fluid className=" my-4 py-4 border border-dark rounded">
                  <Row>
                      <Col>
                          <h3 className="text-center mb-4">Usuarios</h3>
                      </Col>
                  </Row>
  
                  <Row className="my-3">
                      <Col md={6}>
                          <Select
                              options={options}
                              isClearable
                              placeholder="Buscar por Email"
                              value={searchUser}
                              onChange={setSearchUser}
                          />
                      </Col>
                  </Row>
  
                  <Row>
                      <Col>
                          <Table striped bordered hover responsive>
                              <thead>
                                  <tr>
                                      <th>Id</th>
                                      <th>Email</th>
                                      <th>Vendedor</th>
                                      <th>Acciones</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {filteredUsers.length > 0 ? (
                                  filteredUsers.map((user) => (
                                      <tr key={user._id}>
                                          <td>{user._id}</td>
                                          <td>{user.email}</td>
                                          <td>{user.esVendedor ? "Si" : "No"}</td>
                                          <td>
                                              <button className="btn btn-danger mx-3" onClick={() => handleDelete(user._id)}>
                                                  Eliminar
                                              </button>
                                          </td>
                                      </tr>
                                    ))
                                  ) : (
                                      <tr>
                                          <td colSpan="4" className="text-center">
                                              No hay usuarios disponibles
                                          </td>
                                      </tr>
                                  )}
                              </tbody>
                          </Table>
                      </Col>
                  </Row>
              </Container>
  
              <Container fluid className=" my-4 py-4 border border-dark rounded">
                  <Row>
                      <Col>
                          <h3 className="text-center mb-4">Productos</h3>
                      </Col>
                  </Row>
  
                  <Row className="my-3">
                      <Col md={6}>
                          <Select
                              options={productOptions}
                              isClearable
                              placeholder="Buscar por Nombre"
                              value={searchProduct}
                              onChange={setSearchProduct}
                          />
                      </Col>
                  </Row>
  
                  <Row>
                      <Col>
                          <Table striped bordered hover responsive>
                              <thead>
                                  <tr>
                                      <th>Id</th>
                                      <th>Nombre</th>
                                      <th>ID Vendedor</th>
                                      <th>Estatus</th>
                                      <th>Acciones</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {filteredProducts.length > 0 ? (
                                  filteredProducts.map((product) => (
                                  <tr key={product._id}>
                                      <td>{product._id}</td>
                                      <td>{product.nombre}</td>
                                      <td>{product.usuario}</td>
                                      <td>{product.status}</td>
                                      <td>
                                          <button className="btn btn-danger mx-3" onClick={() => handleDeleteProduct(product._id)}>
                                              Eliminar
                                          </button>
                                      </td>
                                  </tr>
                                ))
                                ) : (
                                  <tr>
                                      <td colSpan="4" className="text-center">
                                          No hay productos disponibles
                                      </td>
                                  </tr>
                                  )}
                              </tbody>
                          </Table>
                      </Col>
                  </Row>
              </Container>
          </Container>
          );
      };
  
  export default AdminPanel;