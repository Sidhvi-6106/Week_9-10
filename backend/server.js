import exp from 'express'
import {connect} from "mongoose"
import {config} from "dotenv"
import {userRoute} from './APIs/UserAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
import {adminRoute} from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from './APIs/CommonAPI.js'
import cors from 'cors'
config() //process.env
const app=exp()
app.use(cors({origin:["http://localhost:5173"],credentials:true}));// credentials if attached then only we can recevie the cookie in the application of inspect 
//connect to db
app.use(exp.json())
//connect APIs
//add cookie parser middleware
app.use(cookieParser())
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)
const connectDB= async()=>{ //function expression 
    try{
    await connect(process.env.DB_URL)
    console.log("DataBase Connection Success")
    app.listen(process.env.PORT,()=>console.log("server Started"))
    }catch(err){
        console.log("err in Db Connection" ,err)
    }
}
connectDB()
// app.post('/logout',(req,res)=>{
//     res.clearCookie('token',{
//         httpOnly:true, //must match  original settings
//         secure:false, //must match original settings
//         sameSite:'lax'// must match original settings
//     });
//     res.status(200).json({message:"Logged Out Succesfully"})
// })
//dealing with invalid path 
app.use((req,res,next)=>{
    console.log(req.url)
    res.json({message:`${req.url} is Invalid Path`})
})
//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
    res.json({message:" error ",reason:err.message})
})
