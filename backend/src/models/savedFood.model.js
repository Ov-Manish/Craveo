import mongoose, { Types } from "mongoose";

const savedFoodSchema = new mongoose.Schema({
    user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required:true
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'foodItem',
        required : true
    }
},{timestamps: true})

const savedFoodModel = mongoose.model("sevedFood",savedFoodSchema)

export default savedFoodModel;