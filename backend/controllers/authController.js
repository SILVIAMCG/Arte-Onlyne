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

export { register };


