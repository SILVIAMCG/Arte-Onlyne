import axios from 'axios';

const port = process.env.PORT || 5000;
const api= process.env.REACT_APP_API_URL;


export const orderRequest = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${api}/comprar`,data,
            {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
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