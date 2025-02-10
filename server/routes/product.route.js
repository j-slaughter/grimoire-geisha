/**
 * @module product.route.js
 * @description Router for handling products
 */

import express from 'express';
import { verifyAccess, adminAccess } from '../middleware/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getFeaturedProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', verifyAccess, adminAccess, getAllProducts);

router.post('/', verifyAccess, adminAccess, createProduct);

router.delete('/:id', verifyAccess, adminAccess, deleteProduct);

router.get('/featured', getFeaturedProducts);

export default router;
