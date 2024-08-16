import axios from 'axios';

const port = process.env.PORT || 5000;
const api= `http://localhost:${port}/api`;


//ESTA FUNCION ES PARA HACER LA SOLICITUD DE LA RUTA PARA EL FORMULARIO DE VENDEDOR, PARA EL QUE GUARDA LOS DATOS
//TEMPORALES EN UNA COOKIE. Se usara en el context sellerContext
export const sellerRequest = async (data) => {
    //verifico si recibe los datos
    console.log("Data from sellerRequest:", data);
    try {
        //recibe el token
        const token = localStorage.getItem('token');
        console.log("token desde seller request",token);
        //hace la solicitud a la ruta, hay que revisar esto porque aca puede haber un problema
        //ya que la cookie no se envia desde el cliente, aunque el error lo da en el middleware 
        //cookie verification
        const response = await axios.post(`${api}/authuser/vender`,data,
            {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
        
        console.log("Response from sellerRequest:", response); // Verifica la respuesta completa
        console.log("Data from response:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response); //este es el error que aparece al intentar ingresar los datos temporales desde el cliente
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
        } else {
            console.error("Error en el manejo de la solicitud:", error.message);
        }
        throw error;
    }
};

//esta funcion es para hacer la solicitud de la ruta para el formulario de datos bancarios del vendedor
export const sellerBankRequest = async (data) => {
    console.log("Data from sellerBankRequest:", data);
    try {
        const token = localStorage.getItem('token');
        console.log("token desde sellerBankRequest",token);
        const response = await axios.post(`${api}/authuser/banco`,data,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }); 
        console.log("Response from sellerBankRequest:", response); // Verifica la respuesta completa
        console.log("Data from response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud del banco del vendedor:", error);
        throw error;
    }
};





