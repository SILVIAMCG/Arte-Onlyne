import { check, validationResult } from "express-validator";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

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

const loginValidation = (req, res, next) => {
    // const token = req.headers.cookie;
    // console.log(token);
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        req.user = user;
    });
    next();
}


export { registerValidation, loginValidation };