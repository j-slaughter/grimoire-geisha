/**
 * @module payment.route.js
 * @description Router for handling payment
 */

import express from 'express';
import { verifyAccess } from '../middleware/auth.middleware.js';
import { createCheckoutSession, createOrder } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/checkout-session', verifyAccess, createCheckoutSession);

router.post('/checkout-success', verifyAccess, createOrder);

export default router;
