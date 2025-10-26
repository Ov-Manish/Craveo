import { Router } from "express";
import { createFoodItems , getFoodItems} from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware , authUserMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({
    storage : multer.memoryStorage(),
})

const foodRoutes = Router();

// POST : /api/food/ [protected] for fodd partners to upload new food data
foodRoutes.post(
    '/', //path
    authFoodPartnerMiddleware, //secutiry layer middleware for FOOD-PARTNER
    upload.single("video"), // multer middleware to handle video upload
    createFoodItems // Food Creation controller
)


// GET : /api/food/  [protected] for users to get all food items (scroll the multiple videos )
foodRoutes.get(
    '/', //path method GET
    authUserMiddleware, //secutiry layer middleware for USER
    getFoodItems // Food Getting controller
);

export default foodRoutes; 