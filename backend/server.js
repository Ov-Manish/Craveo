// Starting the Server in this file 
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv"
// Load env variables from env file 
dotenv.config()
// Connecting the mongodb with help of mongoose
connectDB()


app.listen(3000 , ()=>{
    console.log(`http://localhost:3000`);
    
})