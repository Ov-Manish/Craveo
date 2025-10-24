import mongoose from "mongoose";

const connectDB = async() =>{
   await  mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("MongoDB Connected Succesfully 👍");     
    })
    .catch((err)=>{
        console.log("Unable To Connect With The Mongodb 👎",err);
    })
}

export default connectDB; 