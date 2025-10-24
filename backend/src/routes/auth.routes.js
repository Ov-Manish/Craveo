import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/auth.controller.js";
// router from express
const router = Router();
// Route for Registration : 
router.post('/user/register',registerUser) // registerUser controller is used 
router.post('/user/login',loginUser) // loggedInUser controller is used 
router.get('/user/logout',logoutUser) // logout controller is used 

export default router; 