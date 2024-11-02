import axios from "axios";

const port = process.env.PORT || 5000;
const api= `http://localhost:${port}/api`;

export const usersRequest = async () => {
    try {
        const response = await axios.get(`${api}/admin/adminUsers`);
        console.log(response.data);
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

export const deleteUserRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/${id}`);
        console.log(response.data);
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

export const deleteUserAndAssociationsRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/adminUsers/${id}`);
        console.log(response.data);
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

export const getProductsRequest = async () => {
    try {
        const response = await axios.get(`${api}/admin/adminProducts`);
        console.log(response.data);
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

export const deleteProductRequest = async (id) => {
    try {
        const response = await axios.delete(`${api}/admin/adminProducts/${id}`);
        console.log(response.data);
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





