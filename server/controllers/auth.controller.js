/**
 * @module auth.controller.js
 * @description Controller for authentication
 */
import User from "../models/user.model.js";

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
        // 201 (Created)
        return res.status(201).json({newUser, message: "User created successfully!"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {
    res.send('Login route called');
};

export const logout = async (req, res) => {
    res.send('Logout route called');
};

