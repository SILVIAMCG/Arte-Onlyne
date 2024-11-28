import axios from 'axios';

//Este archivo almacena las rutas que se usaran en los context

const port = process.env.PORT || 5000;

const api= `http://localhost:${port}/api`;

export const registerRequest = async(user) =>{
    try{
        const response = await axios.post(`${api}/authuser`, user);
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

