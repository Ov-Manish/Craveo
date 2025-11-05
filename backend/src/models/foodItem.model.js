import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
    },
    video : {
        type : String, // url of the video,
        required : true,
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodPartner"
    },
    likeCount :{
        type : Number,
        default : 0
    }
})

const foodItemModel = mongoose.model('foodItem' , foodItemSchema);
export default foodItemModel;