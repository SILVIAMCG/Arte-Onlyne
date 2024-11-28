import express from 'express';
import {getProducts, getProductById, updateProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;