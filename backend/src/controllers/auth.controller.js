import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs' //library used to hash the password for security
import jwt from 'jsonwebtoken'
// Controller 1 : Registration Controller
export const registerUser = async(req,res)=>{

    const {name , email , password} = req.body;
    const emailAlreadyExist = await userModel.findOne({email})

    if (emailAlreadyExist) {//checking if email already exist in the db
        return res.status(400).json({
            message : "The Email already exist "
        })
    }

    const hashedpassword = await bcrypt.hash(password , 10);//hashing the password 

    // User Creation : 
    
    const user  = await userModel.create({
        name ,
        email,
        password : hashedpassword
    })

    // token creation : 
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token" , token)// Saving the token in cookies 
    
    res.status(201).json({
        message : "The User is Successfully registered",
        user : {
            _id : user._id,
            email : user.email,
            name : user.name
        }
    })
 }

// Controller 2 : Login Controller 
export const loginUser = async(req,res)=>{

    const {email , password} = req.body;
    
    
    const user = await userModel.findOne({email}).select("+password"); //using .select(+password) which will tell us to use the [passwrod property in the database]

    if (!user) {
       return res.status(400).json({
            message : "Invalid Email and Password "
        })
    }
    console.log("USER 👍 : ",user.password);
    
    const passwordValid = await bcrypt.compare(password , user.password) //comparing the user enter password with the stored user password in the database

    if (!passwordValid) {// if password is incorrect 
         return res.status(400).json({
            message : "Invalid Email and Password "
        })
    }

    // creating the token again when user loggedin 
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token" , token)// Saving the token in cookies again 

    res.status(201).json({
        message : "User Logged in Succesfully ",
        _id : user._id,
        email : user.email,
        name : user.name
    })
}

// Controller 3 : Logout Controller 
export const logoutUser = async(req,res)=>{
     res.clearCookie("token")
     res.status(200).json({
        message : "User Logged Out Successfully "
     })
}

