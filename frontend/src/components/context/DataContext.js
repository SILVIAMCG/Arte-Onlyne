

import { createContext, useEffect, useState } from "react";
import axios from 'axios';
// import { login } from "../../../../backend/controllers/authController";
import { registerRequest, loginRequest, logoutRequest} from "../api/auth";
// import { register } from "../../../../backend/controllers/authController";
const port = process.env.PORT || 5000;

export const dataContext = createContext();
export const userContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:${port}/api/products`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <dataContext.Provider value={{ data, setData }}>
            {children}
        </dataContext.Provider>
    );
};



export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //PRUEBA PARA LOGIN
    const [isLogged, setIsLogged] = useState(false);

    //PRIMER INTENTO DE FETCHuSER
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) return;
      
    //             const response = await axios.get(`http://localhost:${port}/api/authuser`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             setUser(response.data.user);
    //             setIsAuthenticated(true);

    //             console.log(response.data.user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //             setError(error);
    //         }
    //     };
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         fetchUser();
    //     }

    
    //  }, []);



    //SEGUNDO INTENTO DE FETCHUSER
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         fetchUser(token);
    //     }
    // }, []);

    const fetchUser = async (user) => {
        try {
            const response = await registerRequest(user);                
            setUser(response.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error);
        }
    };

        
    const loginUser = async (credentials) => {
        try {
            const response = await loginRequest(credentials);
            const data = response.data;
            localStorage.setItem('token', data.token);
            setUser(data.user);
            if (data.user) {
                setIsLogged(true);
                return true;
            }else{
                throw new Error("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error ingresando usuario:", error);
            setError(error);
            return false;
        }
    };

    const logoutUser = async () => {
        try {
            const response = await logoutRequest(user);
            const data = response.data;
            localStorage.removeItem('token');
            setUser(null);
            setIsLogged(false);
        } catch (error) {
            console.error("Error cerrando sesión:", error);
            setError(error);
        }
    };


    return (
        <userContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLogged, setIsLogged, fetchUser, loginUser, logoutUser}}>
            {children}
        </userContext.Provider>
    );
};

