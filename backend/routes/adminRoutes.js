import express from 'express';
import { getUsers, deleteUserAndAssociations, getProducts, getPendingProducts, approveProduct,rejectProduct } from "../controllers/userAdminController.js";
import { deleteProduct } from "../controllers/productController.js";
import { loginValidation, authorizeAdmin } from '../middleware/validationMw.js';



const router = express.Router();

//RUTA PRINCIPAL DE ADMIN
router.route('/').get(loginValidation, authorizeAdmin);
router.route('/adminUsers').get(getUsers);
router.route('/adminUsers/:id').delete(deleteUserAndAssociations);

//PRODUCTS
router.route('/adminProducts').get(getProducts);
router.route('/adminProducts/:id').delete(deleteProduct);
router.route('/pendingproducts').get(getPendingProducts);

//AUTORIZATIONS
router.route('/aprovedproduct/:id').put(approveProduct);
router.route('/rejectedproduct/:id').put(rejectProduct);

export default router;