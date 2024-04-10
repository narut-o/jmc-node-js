
import {v2 as cloudinary} from 'cloudinary';
import { cloudinaryConfig } from '../services/cloudinary.js';




export const signature = (req,res)=>{

    try {
        const timestamp  = Math.round(new Date().getTime()/1000)
        const signature = cloudinary.utils.api_sign_request( { timestamp}, cloudinaryConfig.api_secret)
        res.json({timestamp,signature,cloudname:cloudinaryConfig.cloud_name,apikey:cloudinaryConfig.api_key});
    } catch (error) {
     
        res.json({success:false,message:"Error"})
    }

}