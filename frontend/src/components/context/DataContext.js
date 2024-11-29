
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { registerRequest, loginRequest, logoutRequest} from "../api/auth";
import { jwtDecode } from "jwt-decode";
const port = process.env.PORT || 5000;

export const dataContext = createContext();
export const userContext = createContext();

//ESTA FUNCION ES PARA MANEJAR EL CONTEXTO DE LOS PRODUCTOS
export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    useEffect(() => { //SE USA USE EFFECT PARA QUE SE MUESTREN AL CARGAR LA PAGINA
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:${port}/api/products`); //Aqui se puso la solicitud directamente, es la primera funcion que se hizo, las de usuario son diferentes
                setData(response.data);
            } catch (error) {
                console.error("Error obteniendo productos:", error);
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

//ACA VIENEN LOS CONTEXTOS DE LOS USUARIOS, TANTO PARA REGISTRAR, LOGEAR, REGISTRAR VENDEDOR Y DATOS BANCARIOS

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); //Esta variable es para verificar si esta autenticado en el form register
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogged, setIsLogged] = useState(false); //Esta variable es para verificar si esta logeado en el form login
    const [token, setToken] = useState(null)


    //NUEVO FETCHUSER PARA REGISTRAR USUARIO
    const fetchUser = async (user) => {
        try {
            const fetchedUser = await registerRequest(user); // El registerRequest viene de api/auth.js               
            setUser(fetchedUser); // fetchedUser ya es response.data.user
            setIsAuthenticated(true);
            return fetchedUser; // Devuelve el usuario para manejarlo en el componente del formulario
        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error);
            return null; // Devuelve null en caso de error
        }
    };

    
    //FUNCION PARA CHEQUEAR TOKEN

    const checkAuthToken = () => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            const decoded = jwtDecode(savedToken);
            setIsAuthenticated(true);
            setIsLogged(true);
            setIsAdmin(decoded.esAdmin || false);
        }
    };
    
    //FUNCION PARA LOGEAR USUARIO
    const loginUser = async (credentials) => {
        try {
            const response = await loginRequest(credentials);
            const data = response.data;
            localStorage.setItem('token', data.token); // Guarda el token en localStorage
            setUser(data.user);
            setIsLogged(true);
            setToken(data.token);

            const decoded = jwtDecode(data.token);
            setIsAuthenticated(true);
            setIsAdmin(decoded.esAdmin || false); // Actualiza isAdmin

            return true;
        } catch (error) {
            console.error("Error ingresando usuario:", error);
            setError(error);
            return false;
        }
    };

    //Esta funcion actualiza el token, se usa en los componentes que necesitan verificar datos amacenados en el token
    const updateToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    }

    //FUNCION PARA CERRAR SESION
    const logoutUser = async () => {
        try {
            const response = await logoutRequest(user); //el logoutRequest viene de api/auth.js
            const data = response.data;
            localStorage.removeItem('token'); //ELIMINA EL TOKEN DE LOCALSTORAGE
            setUser(null);
            setIsLogged(false);
            setIsAuthenticated(false);
            setIsAdmin(false);
            return;
        } catch (error) {
            console.error("Error cerrando sesión:", error);
            setError(error);
        }
    };

    //ESTO ES PARA VERIFICAR EL TOKEN AL CARGAR EL CONTEXTO
    useEffect(() => {
        checkAuthToken(); 
    }, []);

    return (
        //ESTE CONTEXT SE USA EN INDEX.JS
        <userContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLogged, setIsLogged, fetchUser, loginUser, logoutUser,token, checkAuthToken, isAdmin, updateToken}}>
            {children}
        </userContext.Provider>
    );
};



