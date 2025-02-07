/**
 * @module auth.route.js
 * @description Router for authentication
 */

import express from 'express';
import { login, logout, signup, renewAccess } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/renew-access', renewAccess);

export default router;
