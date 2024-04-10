import ErrorHandler from "../middlewares/error.js";
import { Complaint } from "../models/complaint.js";





export const create =  async (req,res,next)=>{
        
    try {
        const {category,title,description,public_id,url} = req.body;
        await Complaint.create({
            category,
            title,
            description,
            image:{
                public_id,
                url
            },
            user:req.user
        })

        res.sendStatus(201).json({
            success:true,
            message:"complaint registered"
        });
        
    } catch (error) {
       
    }

}
export const getComplaints = async(req,res,next)=>{
    try {
        const complaints = await Complaint.find({user:req.user._id});
        res.status(200).json({
            success:true,
            complaints
        })
    } catch (error) {
        
    }
}
export const getAll = async(req,res,next)=>{
    try {
        const complaints = await Complaint.find();
        res.status(200).json({
            success:true,
            complaints
        })
    } catch (error) {
        
    }
}

export const getDepartmentComplaints = async(req,res,next)=>{
    try {
        const {category} = req.params;
        const {department} = req.user;
        if(category===department)
        { let complaints = [];
            if(category == "water")
            complaints = await Complaint.find({category:"water"});
            
            else if(category == "electricity")
            complaints = await Complaint.find({category:"electricity"});
    
            else if(category == "infrastructure")
            complaints = await Complaint.find({category:"infrastructure"});
    
            res.status(200).json({
                success:true,
                complaints
            })
           }else{}
           res.status(401).json({
            success:false,
            message:"Unauthorized Access"
          
        })
          
        
    } catch (error) {
       
        
    }
}
export const updateComplaintStatus = async(req,res,next)=>{

    try {
        const {id} = req.params;
        const {status} = req.body;
        const complaint = await Complaint.findById(id);
        if(!complaint)return next(new ErrorHandler("Complaint not found",404))
        complaint.status = status;
    await complaint.save();
    res.status(200).json({
        success:true,
        message:"Status updated"
    })

    } catch (error) {
       
    }
}
export const escalateComplaint= async(req,res,next)=>{
    try {
        
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint)return next(new ErrorHandler("Complaint not found",404));
        if(complaint.urgency===5)
        {
           return res.status(401).json({
                success:false,
                message:"Max Urgency Reached"
            })
        }
        complaint.urgency+=1;
        await complaint.save();
        res.status(200).json({
            success:true,
            message:"Urgency escalated"
        })
    } catch (error) {
     
    }

}
export const adminGetAll = async (req,res,next)=>{
    try {
        const complaints =  await Complaint.find({urgency:{$gte:3},status:"pending 🟡"});
        res.status(200).json({
            success:true,
            complaints
        })
    } catch (error) {
        
    }
}
export const allComplaints = async(req,res,next)=>{
    try {

        const complaints =  await Complaint.find();
        res.status(200).json({
            success:true,
            complaints
        })
        
    } catch (error) {
       
    }
}

export const deleteComplaint = async (req,res,next)=>{


     try {
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint)return next(new ErrorHandler("Complaint not found",404));
        await Complaint.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Deleted"
        })

     } catch (error) {
        
     }

}
export const reopenComplaint = async(req,res,next)=>{

    try {
        const {id}  = req.params;
        const complaint = await Complaint.find({user:req.user._id,_id:id});

        if(!complaint)return next(new ErrorHandler("Complaint not found",404));
       
       
       
       await Complaint.findByIdAndUpdate(id,{status:'pending 🟡',urgency:1});

       
       
        res.status(200).json({
            success:true,
            message:"Reopened"
        })

    } catch (error) {
        next(error)
    }

}