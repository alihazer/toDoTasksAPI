import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
    try {
        if(!req.userId){
            return res.status(403).json({ 
                success: false,
                message: "You are not authorized to perform this action"
            });
        }
        const user = await User.findById(req.userId);

        if(user?.isAdmin){
            next();
        }else{
             return res.status(403).json({ 
                success: false,
                message: "You are not authorized to perform this action"
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};