import express from "express";
import { createOrder } from "../controllers/orderController";

const router = express.Router();

router.route("/comprar").post(createOrder);