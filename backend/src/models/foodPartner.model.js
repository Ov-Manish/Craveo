import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
        minlength : [2,"Name Bust be atleast two character long"]
    },
    contactName :{
       type : String,
       required : true,
    },
    phone:{
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], //this symbols shoudl not be there
    },
    password : {
        type : String,
        minlength : [6,"Password must be at least 6 characters long"],
        select: false, //this will not include the password property when we fetch data from the mongoDB
    },

})

const foodPartnerModel = mongoose.model('foodPartner' , foodPartnerSchema)

export default foodPartnerModel;