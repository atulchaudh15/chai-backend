import  {Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router= Router()

//ab yhn p hm post request s user ko register kr denge 
//registerUser ka controller hmne bnaaya h
router.route("/register").post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1
      },
      {
        name: "coverImage",
        maxCount: 1
      }
    ]),
    registerUser
)
//router.route("/login").post(login)

router.route("/login").post(loginUser)

//secured route
router.route("/logout").post(verifyJWT, logoutUser)


export default router