import express from 'express';
import {register,login,logout,profile} from '../controllers/authController.js';
import { saveSellerDataTemp,registerSellerBank, sellProducts} from '../controllers/sellerController.js';
import {registerValidation, loginValidation, verifyToken, cookieVerification, authorizeSeller} from '../middleware/validationMw.js';

//ESTAS SON LAS RUTAS 
const router = express.Router();

router.route('/').post(registerValidation, register); //REGISTER
router.route('/login').post(login); //LOGIN
router.route('/logout').post(logout); //LOGOUT
router.route('/vender').post(loginValidation, saveSellerDataTemp); //VENDER (RUTA PROTEGIDA)
//VIENEN LOS MIDDELWARES DE VALIDACION DE LOGIN Y COOKIE VERIFICATION, Y LAS FUNCIONES DEL CONTROLADOR
router.route('/banco').post(loginValidation,registerSellerBank); //FORMULARIO DE BANCO, UNA VEZ QUE COMPLETA EL FORMULARIO DE VENDER
router.route('/misproductos').post(loginValidation, authorizeSeller,sellProducts); //FORMULARIO DE PRODUCTOS, UNA VEZ QUE COMPLETA EL FORMULARIO DE BANCO


export default router;
