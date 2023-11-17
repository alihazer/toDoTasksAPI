import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }
        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = await User.create({ name, email, password: hashedPassword });
        // Return user
        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        throw new Error(error);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
        }
        // Generate token
        const token = generateToken(user._id);
        // Return user
        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: user,
            token,
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

export const getUserProfile = asyncHandler(async (req, res) => {
    res.json({
        status: 'success',
        message: 'User profile fetched successfully',
        data: req.user,
    });
});