/**
 * @module coupon.route.js
 * @description Router for handling coupons
 */

import express from 'express';
import { verifyAccess, adminAccess } from '../middleware/auth.middleware.js';
import { validateCoupon, createCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.get('/', validateCoupon);

router.post('/', verifyAccess, adminAccess, createCoupon);

export default router;
