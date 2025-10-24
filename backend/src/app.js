// Server Creation will be done here
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";
const app = express();


app.use(express.json()) // this convert the url data to json 

app.use(express.urlencoded({extended : true})) //this convert the form data from html form tag to json format

app.use(cookieParser()) // to save the tokens in the cookie we need this package 

app.use('/api/auth' , router);

app.get('/',(req,res)=>{
    res.send('Hello Manish Sharma')
})
app.get('/home',(req,res)=>{
    res.send('Welcome Home')
})


export default app;