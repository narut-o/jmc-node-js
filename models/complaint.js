import mongoose from "mongoose";



const complaintSchema = new mongoose.Schema({


    
   category:{
    type:String,
    required:true
   },
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   status:{
    type:String,
    default:"pending 🟡"
   },
   image:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   urgency:{
     type:Number,
     default:1
   },
   createdAt:{
    type:Date,
    default:Date.now
   }




})


export const  Complaint = mongoose.model("Complaint",complaintSchema);

