import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
        minlength : [2,"Name Bust be atleast two character long"]
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
    }

},
{
     timestamps: true,
})


const userModel = mongoose.model('user' , userSchema)

export default userModel;