import axios from 'axios';

const port = process.env.PORT || 5000;
const api= process.env.REACT_APP_API_URL;


//ESTA FUNCION ES PARA HACER LA SOLICITUD DE LA RUTA PARA EL FORMULARIO DE VENDEDOR, PARA EL QUE GUARDA LOS DATOS
//TEMPORALES EN UNA COOKIE. Se usara en el context sellerContext
export const sellerRequest = async (data) => {
    try {
        //recibe el token
        const token = localStorage.getItem('token');
        //hace la solicitud a la ruta
        const response = await axios.post(`${api}/authuser/vender`,data,
            {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
        return response.data;
    }catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response); 
        }else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        }else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//esta funcion es para hacer la solicitud de la ruta para el formulario de datos bancarios del vendedor
export const sellerBankRequest = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${api}/authuser/banco`,data,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }); 
        return response.data;
    }catch (error) {
        console.error("Error en la solicitud del banco del vendedor:", error);
        throw error;
    }
};





