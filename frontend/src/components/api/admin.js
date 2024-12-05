import axios from "axios";

const port = process.env.PORT || 5000;
const api= process.env.REACT_APP_API_URL;

//Obtiene la lista de usuarios
export const usersRequest = async () => {
    try {
        const response = await axios.get(`${api}/admin/adminUsers`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//eliminar usuario
export const deleteUserRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//elimina al usuario cuando es vendedor, y tiene sus datos bancarios y productos en diferentes colecciones, las elimina de todas
export const deleteUserAndAssociationsRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/adminUsers/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//obtiene lista de productos
export const getProductsRequest = async () => {
    try {
        const response = await axios.get(`${api}/admin/adminProducts`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//elimina un producto
export const deleteProductRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/adminProducts/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//obtiene los productos pendientes por aprobar
export const getPendingProductsRequest = async () => {
    try {
        const response = await axios.get(`${api}/admin/pendingproducts`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
}

export const approveProductRequest = async (id) => {
    try {
        const response = await axios.put(`${api}/admin/aprovedproduct/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

export const rejectProductRequest = async (id) => {
    try {
        const response = await axios.put(`${api}/admin/rejectedproduct/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

