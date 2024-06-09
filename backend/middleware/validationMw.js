import { check, validationResult } from "express-validator";

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

export { registerValidation };