import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';




const register = asyncHandler(async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            nombre, 
            email, 
            password: passwordHash });
        const userSaved = await newUser.save();
        jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) {
                throw new Error(err);
            }
            res.cookie('token', token, {
                httpOnly: true,
            });
            res.status(201).json({ token, user: userSaved });
        });

        // res.status(201).json(userSaved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({email});
        if (!isUser) {
            res.status(400).json({ message: 'Usuario o contraseña incorrecto' });
            return;
        }
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Usuario o contraseña incorrecto' });
            return;
        }

        jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
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

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: 'Logged out' });
});

const profile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }
    return res.json(user);

});

export { register, login, logout, profile};


