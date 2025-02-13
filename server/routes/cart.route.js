/**
 * @module cart.route.js
 * @description Router for handling checkout cart
 */

import express from 'express';
import { verifyAccess } from '../middleware/auth.middleware.js';
import {
  getCart,
  addToCart,
  updateQuantityInCart,
  deleteFromCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', verifyAccess, getCart);

router.post('/', verifyAccess, addToCart);

router.put('/:id', verifyAccess, updateQuantityInCart);

router.delete('/', verifyAccess, deleteFromCart);

export default router;
