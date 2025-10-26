import foodItemModel from "../models/foodItem.model.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/storage.service.js";
// Controller 1 : Add Food Item Controller
export const createFoodItems = async(req,res)=>{
    // console.log("THE FOOD PARTNER : ",req.foodPartner);
    // console.log("THE BODY : ",req.body);
    // console.log("THE FILE : ",req.file);
    
    const fileuploading = await uploadFile(req.file.buffer,uuidv4());
    // console.log("FILE UPLOADING : ",fileuploading);

    /* two main things which helps to make a website high quality website Learn this : 
    { 
      Dao files
      Express Validation
    } */
    if (!fileuploading) {
        return res.status(500).json({
            message : "Error in File Uploading "
        })
    }

    
    const foodItem = await foodItemModel.create({
        name : req.body.name,
        description : req.body.description,
        video : fileuploading.url,
        foodPartner : req.foodPartner._id,
    })
    res.status(201).json({
        message : "Food Item Created Successfully",
        food : foodItem
    })
    
}

export const getFoodItems = async(req,res)=>{
    const foodItems = await foodItemModel.find({})
    res.status(201).json({
        message : "Food Items fetched Successfully",
        foodItems : foodItems
    })
}