import express from 'express';
import {getProducts, getProductById, deleteProduct} from '../controllers/productController.js';

//ESTOS VENIAN DE AUTH ROUTES
// import { createProduct} from '../controllers/productController.js';
// import {loginValidation, authorizeSeller} from '../middleware/validationMw.js';
// import fileUpload from 'express-fileupload';


const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
// router.route('/:id').delete(deleteProduct);

//ESTO VIENE DE AUTH ROUTES, Y AHORA FUE MOVIDO A SELLER ROUTES
// router.route('/misproductos').post(loginValidation, authorizeSeller,fileUpload({
//        useTempFiles : true,
//        tempFileDir : './uploads'
//      }),createProduct);

export default router;