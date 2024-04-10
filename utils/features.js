import jwt from "jsonwebtoken";
import { cookieOptions } from "./cookie.js";


export const sendJWT = (user,res,message)=>{
    const token  =  jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(201).cookie("token",token,cookieOptions).json({
        success:true,
        message,
        user:user._id
    })
}