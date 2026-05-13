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

const allowedOrigins = [
    "http://localhost:5173",
    "https://week-9-10-4mcj.vercel.app",
    ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim()) : []),
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true, // Required for cookies/sessions
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.use(cors({origin:["http://localhost:5173"],credentials:true}));// credentials if attached then only we can recevie the cookie in the application of inspect 
//connect to db
app.use(exp.json())
//connect APIs
//add cookie parser middleware
app.use(cookieParser())
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)
const port = process.env.PORT || 10000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    connect(process.env.DB_URL)
        .then(() => console.log("DataBase Connection Success"))
        .catch(err => console.log("err in Db Connection", err));
});
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
    res.status(404).json({message:`${req.url} is Invalid Path`})
})
//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).json({message:"error",reason:err.message})
})
