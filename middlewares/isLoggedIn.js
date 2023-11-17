import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verfiyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next)=>{
    const token = getTokenFromHeader(req);
    if(!token){
        throw new Error('No token found, please login again');
    }
    else{
        const decoded = verfiyToken(token);
        if(!decoded){
            throw new Error('Expired Token, please login again');
        }
        req.userID = decoded;
        next(); 
    }
}