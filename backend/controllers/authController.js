import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
        //Se crea un token con el id del usuario y se guarda en una cookie
        //EN LA COOKIE SE AÑADIO EL CAMPO ES VENDEDOR PARA ACCEDER DESDE LA COOKIE
        jwt.sign({ id: isUser._id, esVendedor: isUser.esVendedor}, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                throw new Error(err);
            }
            res.cookie('token', token, {
                httpOnly: true,

            });
            res.status(200).json({ token, user: isUser });
        });
        
       }catch (error) {
            res.status(400).json({ message: error.message });
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

//ESTA FUNCION NO SE ESTA USANDO
// const profile = asyncHandler(async(req,res) => {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) {
//         res.status(404).json({ message: 'Usuario no encontrado' });
//         return;
//     }
//     return res.json(user);

// });



export { register, login, logout};


