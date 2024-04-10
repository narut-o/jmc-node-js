
import bcrypt from 'bcrypt'
import {User} from '../models/user.js'
import ErrorHandler from '../middlewares/error.js'
import { sendJWT } from '../utils/features.js';
import { cookieOptions } from '../utils/cookie.js';

export const register = async(req,res,next)=>{
      
    try {

        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        let user = await User.findOne({email});
        if(user)return next(new ErrorHandler("User already exists",400));

         user = await User.create({
            name,email,password:hashedPassword
        })
        sendJWT(user,res,"User created successfully")
        
    } catch (error) {
           next(error);
    }
   
}
export const login = async (req,res,next)=>{
 
    try {
     const {email,password} = req.body;
     const user = await User.findOne({email}).select("+password");
     if(!user)return next(new ErrorHandler("Email or Password Incorrect",400))
     const isMatched = await bcrypt.compare(password,user.password);
     if(!isMatched)return next(new ErrorHandler("Email or Password Incorrect",400))
     sendJWT(user,res,`Welcome ${user.name}`);
    } catch (error) {
        next(error)
    }
 
    
 }
 export const getMyProfile = (req,res)=>{
   
    res.status(200).json({
     success:true,
     user:req.user
    })
}

export const getEmployees = async(req,res,next)=>{
         try {
            const employees = await User.find({role:"admin"});
            res.status(200).json({
                success:true,
                employees
            })
         } catch (error) {
            next(error)
         }
}

export const updateDepartment = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {department} = req.body;

        const employee = await User.findOne({_id:id});
        if(!employee)return  next(new ErrorHandler("Employee not found",400));
        employee.department = department;
        await employee.save();
        res.status(200).json({
            success:true,
            message:"Department Changed"
        })
    } catch (error) {
        next (error)
    }
}



export const logout = (req,res)=>{
       
 
 res.status(200).cookie("token",null,{...cookieOptions,expires: new Date(Date.now())}).json({
     success:true,
     user:req.user
 })
}