import express from 'express';
import { getUsers, deleteUser, deleteUserAndAssociations, getProducts, getPendingProducts, approveProduct,rejectProduct } from "../controllers/userAdminController.js";
import { deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.route('/adminUsers').get(getUsers);
// router.route('/:id').delete(deleteUser);
router.route('/adminUsers/:id').delete(deleteUserAndAssociations);

//PRODUCTS
router.route('/adminProducts').get(getProducts);
router.route('/adminProducts/:id').delete(deleteProduct);
router.route('/pendingproducts').get(getPendingProducts);

//AUTORIZATIONS
router.route('/aprovedproduct/:id').put(approveProduct);
router.route('/rejectedproduct/:id').put(rejectProduct);

export default router;