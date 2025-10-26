import foodPartnerModel from "../models/foodPartner.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

//  Middleware 1 : Auth Food Partner Middleware
export const authFoodPartnerMiddleware = async(req,res,next)=>{
    const token = req.cookies.token; // getting the token from the cookies

    if (!token) { // checking if token exist in the cookies or not
        return res.status(401).json({
            message : "Unauthorized Access , Please Login First"
        })
    }

    try {
        // Verifying the token is it the Correct one or not 
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY );

        // finding the food partner with the help of the decoded token id
        const foodPartner = await foodPartnerModel.findById(decodedToken.id);

        req.foodPartner = foodPartner; // attaching the foodPartner data to the req object
        next();

    } catch (err) {
        return res.status(401).json({
            message : "Invalid Token"
        })
    }
}
// Middleware 2 : Auth User Middleware
export const authUserMiddleware = async(req,res,next)=>{
    const token = req.cookies.token; // getting the token from the cookies

    if (!token) {
        return res.status(401).json({
            message : "Unauthorized Access by User , Please Login First"
        })
    }

    try {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY );
        const user  =  await userModel.findById(decodedToken.id)
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message : "Invalid Token for User"
        })
    }
}

