import  {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

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

export default router