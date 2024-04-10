import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
       },
       email:{
        type:String,
        unique:true,
        required:true
       },
       password:{
        type:String,
        select:false,
        required:true
       },
       
       createdAt:{
        type:Date,
        default:Date.now
       },
       role:{
        type:String,
        default:"user"
       },
       department:{
        type:String,
        default:"customer"
       }
})

export const User = mongoose.model("User",userSchema);