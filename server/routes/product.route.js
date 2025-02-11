/**
 * @module product.route.js
 * @description Router for handling products
 */

import express from 'express';
import { verifyAccess, adminAccess } from '../middleware/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getRecommendedProducts,
  getCategoryProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', verifyAccess, adminAccess, getAllProducts);

router.post('/', verifyAccess, adminAccess, createProduct);

router.patch('/:id', verifyAccess, adminAccess, updateProduct);

router.delete('/:id', verifyAccess, adminAccess, deleteProduct);

router.get('/featured', getFeaturedProducts);

router.get('/recommended', getRecommendedProducts);

router.get('/category/:category', getCategoryProducts);

export default router;
