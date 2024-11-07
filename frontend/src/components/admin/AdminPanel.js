import React from 'react'
import { Container, Row, Col, ListGroup, Table, Button } from 'react-bootstrap';
import { usersRequest, deleteUserAndAssociationsRequest, getProductsRequest, deleteProductRequest, approveProductRequest, rejectProductRequest, getPendingProductsRequest} from '../api/admin';
import { useState, useEffect } from 'react';
import Select from 'react-select'; 
import Swal from 'sweetalert2';


const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchUserId, setSearchUserId] = useState(null); 
    const [searchProductId, setSearchProductId] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pendingProducts, setPendingProducts] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await usersRequest();
                setUsers(res);
                setFilteredUsers(res.slice(-5)); 
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await getProductsRequest();
                setProducts(res);
                setFilteredProducts(res.slice(-5)); 
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        getProducts();
    },[]);

    
    useEffect(() => {
        if (searchUserId) {
            const foundUser = users.find(user => user._id === searchUserId.value);
            setFilteredUsers(foundUser ? [foundUser] : []);
        } else {
            setFilteredUsers(users.slice(-5)); 
        }
    }, [searchUserId, users]); 

    const getPendingProducts = async () => {
        try {
            const res = await getPendingProductsRequest();
            setPendingProducts(res);
        } catch (error) {
            console.error("Error al obtener productos pendientes:", error);
        }
    };

    useEffect(() => {
        getPendingProducts();
    },[pendingProducts]);


    const options = users.map(user => ({
        value: user._id,
        label: user._id
    }));

    // useEffect(() => {
    //     if (searchProductId) {
    //         const foundProduct = products.find(product => product._id === searchProductId.value);
    //         setFilteredProducts(foundProduct ? [foundProduct] : []);
    //     } else {
    //         setFilteredProducts(products.slice(-5)); 
    //     }
    // },[searchProductId, products]);

    const productOptions = products.map(product => ({
        value: product._id,
        label: product._id
    }));

    const handleDelete = async (id) => {
        try {
            const result = await showAlert('Esta acción eliminará todo lo asociado al ítem', 'Eliminar');
            if (result.isConfirmed) { 
                await deleteUserAndAssociationsRequest(id);
                const res = await usersRequest();
                setUsers(res);
                setFilteredUsers(res.slice(-5));
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const result = await showAlert('Esta acción eliminará todo lo asociado al ítem', 'Eliminar');
            if (result.isConfirmed) { 
                await deleteProductRequest(id);
                const res = await getProductsRequest();
                setProducts(res);
                setFilteredProducts(res.slice(-5));
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const handleAproveProduct = async (id) => {

        try {
            const result = await showAlert('Esta acción aprobará el producto', 'Autorizar');
            if (result.isConfirmed){
                await approveProductRequest(id);
                getPendingProducts();
            }
        } catch (error) {
            console.error("Error al aprobar producto:", error);
        }
    };

    const handleRejectProduct = async (id) => {
        try {
            const result = await showAlert('Esta acción rechazará el producto', 'Rechazar');
            if (result.isConfirmed) {
                await rejectProductRequest(id);
                getPendingProducts();
            }
        } catch (error) {
            console.error("Error al rechazar producto:", error);
        }
    };

    // 'Esta acción eliminará todo lo asociado al ítem'

    
    const showAlert = (text, confirmButtonText) => {
        return Swal.fire({
            title: '¿Estás seguro?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        });
    };
    
  return (
    <Container>
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
                                        <td>{product.fecha}</td>
                                        <td>{product.usuario}</td>
                                        <td>
                                            <button className="btn btn-warning mx-3" onClick={() => handleAproveProduct(product._id)}>Autorizar</button>
                                            <button className="btn btn-danger mx-3" onClick={() => handleRejectProduct(product._id)}>Rechazar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No hay productos pendientes</td>
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
                        placeholder="Buscar por ID"
                        value={searchUserId}
                        onChange={setSearchUserId}
                    />
                </Col>
                {/* <Col md={2}>
                    <Button onClick={handleSearch}>Buscar</Button>
                </Col> */}
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
                                        <button className="btn btn-danger mx-3" onClick={() => handleDelete(user._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay usuarios disponibles</td>
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
                        placeholder="Buscar por ID"
                        value={searchProductId}
                        onChange={setSearchProductId}
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
                                        <button className="btn btn-danger mx-3" onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay productos disponibles</td>
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