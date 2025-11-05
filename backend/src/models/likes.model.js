import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{ //which user liked it
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    food:{ // on which food user liked it 
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodItem",
        required : true,
    }
},{timestamps : true})

const likeModel = mongoose.model('like' , likeSchema);
export default likeModel;