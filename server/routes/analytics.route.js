/**
 * @module analytics.route.js
 * @description Router for analytics dashboard
 */

import express from 'express';
import { verifyAccess, adminAccess } from '../middleware/auth.middleware.js';
import { getDashboardData } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/', verifyAccess, adminAccess, getDashboardData);

export default router;
