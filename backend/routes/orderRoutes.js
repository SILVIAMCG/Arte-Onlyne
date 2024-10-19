import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { loginValidation } from "../middleware/validationMw.js";

const router = express.Router();

router.route('/comprar').post(loginValidation, createOrder);

export default router;