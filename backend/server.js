import dotenv from "dotenv"
// Starting the Server in this file 
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
dotenv.config()
// Load env variables from env file 
// Connecting the mongodb with help of mongoose
connectDB()


app.listen(3000 , ()=>{
    console.log(`http://localhost:3000`);
    
})