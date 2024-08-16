import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

//Este archivo almacena las rutas que se usaran en los context

const port = process.env.PORT || 5000;

const api= `http://localhost:${port}/api`;

// export const registerRequest = (user) => axios.post(`${api}/authuser`,user);

export const registerRequest = async(user) =>{
    console.log('user from registerRequest', user)
    try{
        const response = await axios.post(`${api}/authuser`, user);
        
        console.log('Respuesta completa desde registerRequest', response);
        console.log('Datos desde response.data', response.data);
        console.log('Usuario desde response.data.user', response.data.user);
        return response.data.user;
    }catch(error){
        console.error("Error en el registro de usuario:", error);
    }
}



export const loginRequest = (user) => axios.post(`${api}/authuser/login`,user, {
    withCredentials: true,
});
export const logoutRequest = (user) => axios.post(`${api}/authuser/logout`,user,{
    withCredentials: true,
    
});

