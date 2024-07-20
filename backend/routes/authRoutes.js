import express from 'express';
import {register,login,logout,profile} from '../controllers/authController.js';
import { saveSellerDataTemp,registerSellerBank } from '../controllers/sellerController.js';
import {registerValidation, loginValidation, verifyToken, cookieVerification} from '../middleware/validationMw.js';

//ESTAS SON LAS RUTAS 
const router = express.Router();

router.route('/').post(registerValidation, register); //REGISTER
router.route('/login').post(login); //LOGIN
router.route('/logout').post(logout); //LOGOUT
router.route('/vender').post(loginValidation,cookieVerification, saveSellerDataTemp); //VENDER (RUTA PROTEGIDA)
//VIENEN LOS MIDDELWARES DE VALIDACION DE LOGIN Y COOKIE VERIFICATION, Y LAS FUNCIONES DEL CONTROLADOR
router.route('/banco').post(loginValidation,cookieVerification, verifyToken,registerSellerBank); //FORMULARIO DE BANCO, UNA VEZ QUE COMPLETA EL FORMULARIO DE VENDER


export default router;
