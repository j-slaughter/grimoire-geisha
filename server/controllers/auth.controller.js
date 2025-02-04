/**
 * @module auth.controller.js
 * @description Controller for authentication
 */
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { redis } from '../db/redis.js';

/**
 * generateTokens - create accessToken and refreshToken for authenticating
 * users.
 */
const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};

/**
 * storeRefreshToken - stores user's refresh token to Redis cache for quick retrieval
 * for authentication/ authorization
 */
const storeRefreshToken = async (userId, refreshToken) => {
    try {
        // Set key-value pair of userId:refreshToken with 7 day expiration on Redis cache
        await redis.set(userId, refreshToken, "EX", 604800);
    } catch (error) {
        console.log(`Error storing refresh token: ${error.message}`);
    }
};

/**
 * setCookies - Stores accessToken and refreshToken on browser cookies
 */
const setCookies = (res, accessToken, refreshToken) => {
    // Set accessToken
    res.cookie("accessToken", accessToken, {
        secure: true,
        // Prevent XSS attacks (No Javascript access)
        httpOnly: true,
        // Prevent CSRF attacks
        sameSite: "Strict",
        // Expires in 15 min
        maxAge: 15 * 60 * 1000,
    });
    // Set refreshToken
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        // Prevent XSS attacks (No Javascript access)
        httpOnly: true,
        // Prevent CSRF attacks
        sameSite: "Strict",
        // Expires in 7 days
        maxAge: 604800 * 1000,
    });
};

/**
 * signup - creates new user in db, generates tokens, and sets cookies
 */
export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Check for existing user in db
        const userExists = await User.findOne({email});
        if (userExists) {
            // 400 (Bad Request)
            return res.status(400).json({message: "User already exists!"});
        }
        // Create user
        const newUser = await User.create({name, email, password});
        // Create authentication tokens
        const {accessToken, refreshToken} = generateTokens(newUser._id);
        await storeRefreshToken(newUser._id, refreshToken);
        // Set cookies
        setCookies(res, accessToken, refreshToken);
        // 201 (Created)
        return res.status(201).json({user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }, message: "User created successfully!"});
    } catch (error) {
        return res.status(500).json({message: `Signup Error: ${error.message}`});
    }
};

/**
 * login - Validates user
 */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Validate email
        const user = await User.findOne({email});
        // Validate password
        const validPassword = await user.comparePassword(password);
        if (user && validPassword) {
            // Create authentication tokens
            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            // Set cookies
            setCookies(res, accessToken, refreshToken);
            return res.status(200).json({user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, message: "Successful login!"});
        }
        // 401 (Unauthorized)
        return res.status(401).json({message: "Invalid login credentials!"})
    } catch (error) {
        return res.status(500).json({message: `Login error: ${error.message}`});
    }
};

/**
 * logout - Revokes access by clearing accessToken and refreshToken from cookies and Redis cache
 */
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        // Check for valid refreshToken
        if (refreshToken) {
            // Grab user id and delete Redis entry
            const {userId} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(userId)
        }
        // Clear browser cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({message: "Successful logout!"});
    } catch (error) {
        return res.status(500).json({message: `Logout Error: ${error.message}`});
    }
};

/**
 * renewAccess - Generates new accessToken and refreshToken when accessToken expires
 */
export const renewAccess = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        // Check for valid refreshToken
        if (oldRefreshToken) {
            // Grab user id
            const {userId} = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
            // Authenticate by comparing to Redis cache
            const storedToken = await redis.get(userId);
            if (oldRefreshToken === storedToken) {
                // Generate new tokens
                const {accessToken, refreshToken} = generateTokens(userId);
                // Update Redis cache
                await storeRefreshToken(userId, refreshToken);
                // Set cookies
                setCookies(res, accessToken, refreshToken);
                return res.status(200).json({message: "Access renewed!"});
            } else {
                // 401 (Unauthorized)
                return res.status(401).json({message: "Invalid user credentials!"});
            }
        }
        return res.status(401).json({message: "Access has expired!"});
    } catch (error) {
        return res.status(500).json({message: `Error renewing tokens: ${error.message}`});
    }
};
