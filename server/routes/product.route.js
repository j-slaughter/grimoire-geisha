/**
 * @module product.route.js
 * @description Router for handling products
 */

import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);

export default router;
