import foodPartnerModel from "../models/foodPartner.model.js";
import foodItemModel from "../models/foodItem.model.js";
export const getFoodPartnerById = async(req,res)=>{
    const foodPartnerId = req.params.id;
    
    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodItemModel.find({ foodPartner: foodPartnerId });
    if(!foodPartner){
        return res.status(404).json({message : 'Food Partner not found '})
    }
    res.status(200).json({ message: "Yes Food Partner is Found", 
        foodPartner:{
            ...foodPartner.toObject(), // converting mongoose document to plain js object
            foodItems : foodItemsByFoodPartner // attaching food items to the food partner object
        }
        
     });
}