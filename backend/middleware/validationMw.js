import { check, validationResult } from "express-validator";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//ESTE MW ES PARA VALIDAR LOS DATOS QUE SE INGRESAN EN EL FORMULARIO DE REGISTRO

//Esta funcion verifica la cookie, esta dando problemas en el formulario de registro
const cookieVerification = (req, res, next) => {
    console.log('Cookies:', req.cookies); //prueba para ver si recibe alguna cookie
    const userDataTemp = req.cookies.userDataTemp; //se guarda la cookie en una variable
    console.log('userDataTemp:', userDataTemp); //se muestra en consola

    if (userDataTemp) {
        try {
            const decodedData = jwt.verify(userDataTemp, process.env.JWT_SECRET); //se decodifica la cookie
            req.userDataTemp = decodedData;
            console.log('userDataTemp:', decodedData); //se muestra en consola
        } catch (err) {
            console.error('Error decoding userDataTemp cookie:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        //este es el error que da al ingresar los datos temporales desde el front end, en postman si funciona
        return res.status(401).json({ message: 'No token provided desde cookie verification', userDataTemp });
    }

    next();
};
//FIN PRUEBA

//FUNCION PARA VERIFICAR EL TOKEN
const verifyToken = async (req, res, next) => {
    let token;

    // Verifica si el token está en las cookies
    if (req.cookies.token) {
        token = req.cookies.token;
        console.log('Token en cookies:', token);
    }

    // Verifica si el token está en el encabezado de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided desde verifyToken' });
    }

    try {
        //se verifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};



//VALIDACIONES PARA EL REGISTRO DE USUARIOS
const registerValidation = [
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('email').not().isEmpty().isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


//LOGIN VALIDATION CON BEARER
const loginValidation = async (req, res, next) => {
    let token;

    // Primero verifica si el token está en las cookies
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Si no hay token en las cookies, verifica el encabezado de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        // Verifica el token de login del usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        next();
    } catch (error) {
        console.error('Error al verificar el token JWT:', error.message);
        return res.status(401).json({ message: 'Token inválido' });
    }
};


//VERIFICA SI EL USUARIO ES VENDEDOR
const authorizeSeller = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || !user.esVendedor) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }
        req.accessSeller = true;
        next();
    } catch (error) {
        console.error("Error en authorizeSeller:", error);
        return res.status(500).json({ message: 'Error al autorizar usuario vendedor', error: error.message });
    }
};

    
        


export { registerValidation, loginValidation, cookieVerification, verifyToken, authorizeSeller };