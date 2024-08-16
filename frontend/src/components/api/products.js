import axios from 'axios';

const port = process.env.PORT || 5000;
const api= `http://localhost:${port}/api`;

//PRUEBA PARA OPCION DE SUBIR PRODUCTOS
// export const uploadProduct = async () => {
//     try{
//         const response = await axios.post(`${api}/authuser/misproductos`);
//         console.log('Respuesta desde uploadProduct', response);
//         return response.data;
//     }catch(error){
//         console.error("Error en la subida de productos:", error);
//     };
// };

export const uploadProduct = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${api}/authuser/misproductos`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            console.log('Respuesta desde uploadProduct', response);
            return response.data;
        } else {
            // Si no es un código 200, retornar undefined o manejarlo como desees
            console.warn('Acceso no autorizado o error en la respuesta');
            return;
        }
    } catch (error) {
        console.error("Error en la subida de productos:", error);
        return;
    }
};