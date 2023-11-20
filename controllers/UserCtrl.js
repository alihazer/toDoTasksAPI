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

export const editUserProfile = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw new Error('User does not exist');
        }
        // Check if email is already taken
        const emailUser = await User.findOne({ email });
        if (emailUser && emailUser._id.toString() !== req.userId) {
            throw new Error('Email is already taken');
        }
        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Update user
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        await user.save();
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

export const logoutUser = asyncHandler(async (req, res) => {
    try {
        req.userId = null;
        res.json({
            status: 'success',
            message: 'User logged out successfully',
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

export const addNewAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Check if user exists
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw new Error('User does not exist');
        }
        // Check if user is already an admin
        if (user.isAdmin) {
            throw new Error('User is already an admin');
        }
        // Update user
        user.isAdmin = true;
        await user.save();
        // Return user
        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

export const removeAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User does not exist');
        }
        if (!user.isAdmin) {
            throw new Error('User is not an admin');
        }
        user.isAdmin = false;
        await user.save();
        res.json({
            status: 'success',
            message: 'User updated successfully',
        })
    } catch (error) {
        throw new Error(error);
    }
});

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            status: 'success',
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});


export const deleteUser  = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User Not Found");
    }
    try{
        await User.findByIdAndDelete(id);
        // Delete all tasks associated with the user
        await Task.findByIdAndDelete({user: id});
        res.json({
            status: "success",
            message: `User deleted succesfully`
        })
    }
    catch(error){
        console.log(error);
        throw new Error(error)
    }
})