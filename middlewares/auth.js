import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req,res,next) =>{
       
    const {token} = req.cookies;
    if(!token)return res.status(404).json({
        success:false,
        message:"Login First"
    })
    const decode = jwt.decode(token);
    const user = await User.findById(decode._id);
    req.user = user;
    next();
}
export const authorizeRoles = (...roles)=>{

    
    return (req,res,next)=>{

         
        if(!roles.includes(req.user.role))return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        
        next();
    }
}