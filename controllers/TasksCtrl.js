import Task from "../models/Tasks.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";


export const createTask = asyncHandler(async (req, res) => {
    const { name, description, isCompleted} = req.body;
    try {
        const user = await User.findById(req.userId);
        // Check if the task already exists
        const exists = await Task.findOne({ name });
        if(exists){
            throw new Error("Task already exists");
        }
        const task = await Task.create({ name, description, user: req.userId });
        // Push task to the user tasks array
        user.tasks.push(task._id);
        // Save the user
        await user.save();
        res.status(201).json({ 
            success: true,
            message: "Task added succesfully",
            data: task 
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

export const editTask = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    const {name, description, completed} = req.body;
    try {
        // check if the task exists
        const task = await Task.findById(id);
        if(!task){
            throw new Error("Task not found");
        }
        // check if the user is the owner of the task
        if(task.user.toString() !== req.userId){
            throw new Error("You are not the owner of this task");
        }
        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(id, {name, description, completed}, {new: true});
        res.status(200).json({
            status: "success",
            message: "Task updated succesfully",
            data: updatedTask
        })
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

})

export const deleteTask = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    // Check if the task exists
    const taskExists = await Task.findById(id);
    if(!taskExists){
        throw new Error("Task not found");
    }
    // Check if the user is the owner of the task
    if(taskExists.user.toString() !== req.userId){
        throw new Error("You are not the owner of this task");
    }
    // Delete the task
    await Task.findByIdAndDelete(id);
    // Delete the task from the user tasks array
    const user = await User.findById(req.userId);
    user.tasks.pull(id);
    await user.save();
    res.status(200).json({
        status: "success",
        message: "Task deleted succesfully"
    })
})

export const getUserTasks = asyncHandler(async(re, res)=>{
    const tasks = await Task.find({user: req.userId});
    res.status(200).json({
        status: "success",
        message: "Tasks fetched succesfully",
        data: tasks
    });
})
