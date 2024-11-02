import express from 'express';
import { getUsers, deleteUser, deleteUserAndAssociations, getProducts } from "../controllers/userAdminController.js";
import { deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.route('/adminUsers').get(getUsers);
// router.route('/:id').delete(deleteUser);
router.route('/adminUsers/:id').delete(deleteUserAndAssociations);

//PRODUCTS
router.route('/adminProducts').get(getProducts);
router.route('/adminProducts/:id').delete(deleteProduct);


export default router;