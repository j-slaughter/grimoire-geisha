/**
 * @module auth.middleware.js
 * @description Middleware for checking authentication and authorization
 */
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * verifyAccess - checks for vaild accessToken and stores user info on req.user
 */

export const verifyAccess = async (req, res, next) => {
  try {
    // Check for accessToken
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      try {
        // Grab user id
        const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // Retrieve user from db minus their password info
        const user = await User.findById(userId).select('-password');
        // Check for valid user
        if (user) {
          // Store user to request object
          req.user = user;
          next();
        } else {
          // 401 (Unauthorized)
          return res.status(401).json({ message: 'Unauthorized access - user not found!' });
        }
      } catch (error) {
        // Handle expired accessToken
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Unauthorized access - token expired!' });
        }
        throw error;
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized access - token not found!' });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error in verifyAccess middleware: ${error.message}` });
  }
};

/**
 * adminAccess - verifies user is an admin
 */

export const adminAccess = async (req, res, next) => {
  // Check for logged in user(accessToken) and role of admin
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // 403 (Forbidden)
    return res.status(403).json({ message: 'Unauthorized access - Admin only!' });
  }
};
