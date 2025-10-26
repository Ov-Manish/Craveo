import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/auth.controller.js";
import { registerFoodPartner , loginFoodPartner , logoutFoodPartner } from "../controllers/auth.controller.js";
// router from express
const authRouter = Router();
// User AUth APIS  : 
authRouter.post('/user/register',registerUser) // registerUser controller is used 
authRouter.post('/user/login',loginUser) // loggedInUser controller is used 
authRouter.get('/user/logout',logoutUser) // logout controller is used 

// Food Partner Auth APIS  :
authRouter.post('/foodpartner/register',registerFoodPartner) // registerFoodPartner controller is used 
authRouter.post('/foodpartner/login',loginFoodPartner) // loginFoodPartner controller is used 
authRouter.get('/foodpartner/logout',logoutFoodPartner) // logoutFoodPartner controller is used

export default authRouter; 