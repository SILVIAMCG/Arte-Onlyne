import express from 'express';
import {register,login,logout,profile} from '../controllers/authController.js';
import {registerValidation, loginValidation} from '../middleware/validationMw.js';

const router = express.Router();

router.route('/').post(registerValidation, register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/profile').get(loginValidation, profile);


export default router;
