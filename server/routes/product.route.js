/**
 * @module product.route.js
 * @description Router for handling products
 */

import express from 'express';
import { verifyAccess, adminAccess } from '../middleware/auth.middleware.js';
import { getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', verifyAccess, adminAccess, getAllProducts);

export default router;
