import  {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router= Router()

//ab yhn p hm post request s user ko register kr denge 
//registerUser ka controller hmne bnaaya h
router.route("/register").post(registerUser)
//router.route("/login").post(login)

export default router