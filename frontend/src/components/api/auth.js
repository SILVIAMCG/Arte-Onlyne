import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

const port = process.env.PORT || 5000;

const api= `http://localhost:${port}/api`;
// const api= "http://localhost:3000/api";

export const registerRequest = (user) => axios.post(`${api}/authuser`,user);
// export const loginRequest = user => axios.post(`${api}/authuser/login`,user);
export const loginRequest = (user) => axios.post(`${api}/authuser/login`,user);
export const logoutRequest = (user) => axios.post(`${api}/authuser/logout`,user);