import jwt from 'jsonwebtoken';
export const verfiyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return false;
        }
        return decoded;
    });
}