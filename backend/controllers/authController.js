import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/tokenGenerator.js';


//FUNCION PARA REGISTRAR A LOS USUARIOS

const register = asyncHandler(async (req, res) => {
    const { nombre, email, password } = req.body;  //Extraemos los datos del body
    try {
        const userExists = await User.findOne({ email });  //se busca si el usuario ya existe por el email, si existe se manda un mensaje de error
        if (userExists) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 10); //Se encripta la contraseña
        //Se crea un nuevo usuario con los datos del body
        const newUser = new User({ 
            nombre, 
            email, 
            password: passwordHash });
        const userSaved = await newUser.save();
        //Se crea un token con el id del usuario y se guarda en una cookie
        jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) {
                throw new Error(err);
            }
            res.cookie('token', token, {
                httpOnly: true,
            });
            res.status(201).json({ token, user: userSaved });
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//FUNCION PARA INICIAR SESION
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({email});
        if (!isUser) {
            res.status(400).json({ message: 'Usuario o contraseña incorrecto' });
            return;
        }
        //Se compara la contraseña ingresada con la contraseña encriptada en la base de datos
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Usuario o contraseña incorrecto' });
            return;
        }

        //esta funcion viene de utils
        const token = await generateToken(isUser._id, isUser.esVendedor, isUser.esAdmin);
        if (!token) {
            res.status(400).json({ message: 'No se pudo generar el token' });
            return;
        }
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(200).json({ token, user: isUser });        
    }catch(error) {
        res.status(500).json({ message: error.message });
        clearCookie();
    }
});


//FUNCION PARA CERRAR SESION
const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: 'Logged out' });
});


export { register, login, logout};


