import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema= new mongoose.Schema({
   username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
   fullname:{
    type: String,
    required: true,
    trim: true,
    index: true,
   },
   avatar:{
    type: String,
    required: true,
   },
   coverImage:{
    type: String, //claudinary s url lete h isiliye string h
   },
   watchHistory:[
    {
      type: mongoose.Types.ObjectId,
      ref: "Video"
    }
   ],
   password:{
    type: String,
    required: [true, 'Password is required'],
    unique: true,
   },
   refreshToken:{
     type: String
   }



},{timestamps: true})


userSchema.pre("save",  async function (next){
    //ye line ye check kr kr rhi h ki agr pass mdified h tbhi encrypt kro baar baar nhi 
    if(this.isModified("password")){
        //line line password ko encrypt kr rhi h
       this.password= await bcrypt.hash(this.password, 10)
    }
    next();    
})

userSchema.methods.isPasswordCorrect= async function(inputPassword){
    //ye pass jo put kiya h aur jo encrypted h un dono ko comapre krega
    //aur true ya false return krega
    return await bcrypt.compare(inputPassword, this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}




export const User= mongoose.model("User", userSchema) 