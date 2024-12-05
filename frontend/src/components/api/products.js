import axios from 'axios';

const port = process.env.PORT || 5000;
const api= process.env.REACT_APP_API_URL;

//Obtiene el detalle de un producto
export const getProductDetail = async (id) => {
    try {
        //se hace la llamada a la api con el id del producto
        const response = await axios.get(`${api}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

//obtiene los productos de un vendedor específico, que se verifica en el token
export const getProductFromSeller = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${api}/misproductos`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos del vendedor:", error);
        throw error;
    }};


//subir producto, los almacena en un formData
export const uploadProductRequest = async (productData) => {
    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${api}/misproductos`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading product:", error);
        throw error;
    }
};

//actualiza producto
export const updateProductRequest = async (id, productData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${api}/misproductos/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProductRequest = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${api}/misproductos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};