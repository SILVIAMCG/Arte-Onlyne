import axios from 'axios';

const port = process.env.PORT || 5000;
const api= `http://localhost:${port}/api`;

//PRUEBA PARA MOSTRAR PRODUCTOS
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


//NUEVO UPLOAD PRODUCT FUNCIONAL 
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