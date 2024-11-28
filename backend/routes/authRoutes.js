import express from 'express';
import {register,login,logout} from '../controllers/authController.js';
import { saveSellerDataTemp,registerSellerBank} from '../controllers/sellerController.js';
import {registerValidation, loginValidation} from '../middleware/validationMw.js';

const router = express.Router();

router.route('/').post(registerValidation, register); //REGISTER
router.route('/login').post(login); //LOGIN
router.route('/logout').post(logout); //LOGOUT
router.route('/vender').post(loginValidation, saveSellerDataTemp); //VENDER (RUTA PROTEGIDA)
router.route('/banco').post(loginValidation,registerSellerBank); //FORMULARIO DE BANCO, UNA VEZ QUE COMPLETA EL FORMULARIO DE VENDER

export default router;
