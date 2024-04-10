import {app} from "./app.js";
import express from 'express'



const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})