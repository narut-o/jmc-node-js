import express from 'express'
import userRouter from './routes/user.js'
import complainRouter from './routes/complain.js'
import signatureRouter from './routes/signature.js'
import  { config } from 'dotenv'
import { ConnectDB } from './data/database.js';
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middlewares/error.js';
import cors from 'cors'


config({
    path:"./data/.env"
})
export const app = express();
ConnectDB();

const corsConfig = {
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));

// app.get('/api/v1/images/get-signature',(req,res)=>{
//     res.send(200),console.log("THIS IS WORKING")})
app.use('/api/v1/signature',signatureRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/complains',complainRouter);



app.get('/',(req,res)=>{
    res.send("working");
})


app.use(errorMiddleWare);







