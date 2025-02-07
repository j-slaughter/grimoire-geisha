/**
 * @module product.route.js
 * @description Router for handling products
 */

import express from 'express';
import { verifyAccess } from '../middleware/auth.middleware.js';
import { getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', verifyAccess, getAllProducts);

export default router;
