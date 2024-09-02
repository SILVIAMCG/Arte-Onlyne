import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { loginValidation, authorizeSeller } from '../middleware/validationMw.js';
import fileUpload from 'express-fileupload';

const router = express.Router();

router.route('/')
//PARA QUE EL PRODUCTO SUBA LA IMAGEN SOLO SI SE EJECUTA LA FUNCION DE CREAR PRODUCTO
  .post(
    loginValidation, 
    authorizeSeller, 
    fileUpload({
      useTempFiles: true,
      tempFileDir: './uploads'
    }), 
    createProduct
  ); // Crear producto, solo para vendedores

export default router;
