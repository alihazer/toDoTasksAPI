import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            res.status(404).json({ 
                success: false,
                message: "User not found"
            });
        }
        if(user.isAdmin){
            next();
        }else{
            res.status(403).json({ 
                success: false,
                message: "You are not authorized to perform this action"
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};