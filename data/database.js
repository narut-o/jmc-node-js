import mongoose from "mongoose";

export const ConnectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"JMC"})
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((err)=>{console.log(err)})
    
}
