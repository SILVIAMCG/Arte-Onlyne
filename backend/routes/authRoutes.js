import express from 'express';
import {register} from '../controllers/authController.js';
import {registerValidation} from '../middleware/validationMw.js';

const router = express.Router();

router.route('/').post(registerValidation, register);

export default router;