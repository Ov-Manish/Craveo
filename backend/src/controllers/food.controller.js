import foodItemModel from "../models/foodItem.model.js";
import savedFoodModel from "../models/savedFood.model.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/storage.service.js";
import likeModel from "../models/likes.model.js";
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

export const likeFoodController = async(req,res)=>{
    const {foodId} = req.body;
    const userId = req.user;

    const alreadyLiked = await likeModel.findOne({
        user : userId._id ,
        food : foodId
    });
    if(alreadyLiked){
        await likeModel.deleteOne({
            user : userId._id ,
            food : foodId
        })

        await foodItemModel.findByIdAndUpdate(foodId,{
            $inc : {likeCount : -1} // like count decreasing when user unlike the video
        })

        return res.status(200).json({
            message : "User Unliked the food item "
        })
    }

    const like = await likeModel.create({
        user : userId._id,
        food : foodId
    })

     await foodItemModel.findByIdAndUpdate(foodId,{
            $inc : {likeCount : 1} // like count is increasing when user liked the video 
        })

    res.status(201).json({
        message : "Food Item Liked Successfully",
        like : like
    })   
    
}

export const saveFoodController = async(req,res)=>{
    const {foodId} = req.body;
    const user = req.user
    const isFoodVideoSavedAlready = await savedFoodModel.findOne({
        user : user._id,
        food : foodId,
    }) 

    if (isFoodVideoSavedAlready) {
        await savedFoodModel.deleteOne({
            user : user._id,
            food : foodId,
        })

        await foodItemModel.findByIdAndUpdate(foodId,{
        $inc : {saveCount : -1}
        })

        return res.status(200).json({
            message : "Food Unsaved Successfully",
        })
    }
    
    

    const foodSaved = await savedFoodModel.create({
        user : user._id,
        food : foodId
    })
    await foodItemModel.findByIdAndUpdate(foodId,{
        $inc : {saveCount : 1}
        })
    return res.status(201).json({
        message : "Food is Saved Successfully",
        save : foodSaved 
    })
}

export const getSavedFoodVideos = async(req,res)=>{
    const user = req.user;

    const savedFoods = await savedFoodModel.find({
        user : user._id,
    }).populate('food')

    if (!savedFoods) {
        return res.status(404).json({
            message : "No Food Video is Saved "
        })
    }

    res.status(201).json({
        message : "Saved Food Videos is Fetched Successfully",
        savedFoods
    })
}