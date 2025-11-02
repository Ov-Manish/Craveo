// Server Creation will be done here
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import { foodPartnerRoutes } from "./routes/foodPartner.routes.js";
import cors from "cors"

const app = express();
app.use(cors({
    origin : "http://localhost:5173", // frontend server
    credentials : true ,
}))

app.use(express.json()) // this convert the url data to json 
app.use(express.urlencoded({extended : true})) //this convert the form data from html form tag to json format
app.use(cookieParser()) // to save the tokens in the cookie we need this package 

app.use('/api/auth' , authRouter);
app.use('/api/food' , foodRoutes);
app.use('/api/foodPartner' , foodPartnerRoutes);

app.get('/',(req,res)=>{
    res.send('Hello Manish Sharma')
})
app.get('/home',(req,res)=>{
    res.send('Welcome Home')
})


export default app;