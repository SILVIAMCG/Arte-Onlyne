import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

//Este archivo almacena las rutas que se usaran en los context

const port = process.env.PORT || 5000;

const api= `http://localhost:${port}/api`;

export const registerRequest = (user) => axios.post(`${api}/authuser`,user);
export const loginRequest = (user) => axios.post(`${api}/authuser/login`,user);
export const logoutRequest = (user) => axios.post(`${api}/authuser/logout`,user);