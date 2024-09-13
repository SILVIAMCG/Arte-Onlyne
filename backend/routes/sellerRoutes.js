import express from 'express';
import { createProduct, deleteProduct, updateProduct, getProductByUserId } from '../controllers/productController.js';
import { loginValidation, authorizeSeller } from '../middleware/validationMw.js';
import fileUpload from 'express-fileupload';

const router = express.Router();

router.route('/')
//PARA QUE EL PRODUCTO SUBA LA IMAGEN SOLO SI SE EJECUTA LA FUNCION DE CREAR PRODUCTO
  .get(loginValidation, authorizeSeller, getProductByUserId)
  .post(
    loginValidation, 
    authorizeSeller, 
    fileUpload({
      useTempFiles: true,
      tempFileDir: './uploads'
    }), 
    createProduct
  ); // Crear producto, solo para vendedores

  router.route('/:id').delete(deleteProduct); // Borrar producto, solo para vendedores
  router.route('/:id')
    .put(
      loginValidation, 
      authorizeSeller, 
      fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads'
      }), updateProduct); // Modificar producto por ID





export default router;
