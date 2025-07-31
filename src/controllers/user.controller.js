import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens= async(userId) => {
  try {
    const user= await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generatRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})

    return {accessToken, refreshToken}

  } catch (error) {
     throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }
};


const registerUser= asyncHandler (async (req,res) => {
      //get user details from frontend
      //validation- not empty
      //check if user already exists: username, email
      //check for images, check for images for avatar
      //upload them to cloudinary, avatar
      //create user object -create entry in db
      //remove password and refresh token field from response
      //check for user creation
      //return res
      console.log("📂 req.files =>", req.files)
      console.log("📝 req.body =>", req.body)
      const {fullname, email, username,password}= req.body
      console.log("email: ", email);
      
      //we can check all fields one by one
      /*if(fullname=== ""){
       throw new ApiError(400, "fullname is required")
      }*/
      if(
        [fullname,email,username,password].some((field)=> 
        field?.trim()==="")
      ){
        throw new ApiError(400, "All fields are required")
      }
      
      const existedUser= await User.findOne({
        //isse ek saath hm ek s jyada ko check kr skte h
        $or: [{username}, {email}]
      })

      if(existedUser){
        throw new ApiError(409, "User with existing username or email")
      }
      //ye files option multiple files k liye use kiya h jo multer ki help s mila h
      // ? ka mtlb h ki hm check kr rhe h ki files ka access h ya ni
      //avatar file ka name h
      
      
      const avatarFile = req.files?.avatar?.[0];
      if (!avatarFile) throw new ApiError(400, "Avatar file is required");

      const avatarLocalPath = path.resolve(avatarFile.path);
      console.log("📍 Uploading Avatar:", avatarLocalPath);

      const avatar = await uploadOnCloudinary(avatarLocalPath);
      if (!avatar) throw new ApiError(500, "Avatar upload failed");

      console.log("✅ Avatar Uploaded:", avatar.url);

      //const avatarLocalPath= req.files?.avatar[0]?.path
      const coverImageLocalPath= req.files?.coverImage[0]?.path
      
      //if(!avatarLocalPath){
      //  throw new ApiError(400, "Avatar file is required")
      //}
      //if(!coverImageLocalPath){
      //  throw new ApiError(400, "cover image file is required")
      //}
      
      //const avatar= await uploadOnCloudinary(avatarLocalPath)
      const coverImage= await uploadOnCloudinary(coverImageLocalPath)
      
      //const avatarFile = req.files?.avatar;

      //if (!avatarFile || avatarFile.length === 0) {
       // throw new ApiError(400, "Avatar file is required");
      //}

      //ye db s baat krega aur user ko register krega
      const user= await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase()
      })

      const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
      )

      if(!createdUser){
        throw new ApiError(400, "Something went wrong while registering the user")
      }

      return res.status(201).json(
         new ApiResponse(200, createdUser, "User registered successfully")
      )
}) 

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email) || !password) {
    throw new ApiError(400, "Username/email and password are required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }, "User logged in successfully")
    );
});


const logoutUser= asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined
        }
      },
      {
        new : true
      }
    
    )
    const options= {
      httpOnly: true,
      secure: true
    }

    return res.
    status(200).
    clearCookie("accessToken", options).
    clearCookie("refreshToken", options).
    json(new ApiError(200, {}, "User logged out successfully"))

})

const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken

     if(!incomingRefreshToken){
      throw new ApiError(401, "Unauthorized request")
     }

try {
  const decodedToken= jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )
  const user= await User.findById(decodedToken?._id)
  
  if(!user){
    throw new ApiError(401, "Invalid refresh token")
  }
  
  if(incomingRefreshToken !==user?.refreshToken){
    throw new ApiError(401, "refresh token is expired or used")
  
  }
  const options = {
    httpOnly: true,
    secure: true
  }
  
  const {accessToken, newRefreshToken} =await generateAccessAndRefreshTokens(user._id)
  
  return res
  .status(200)
  .cookie("accesstoken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {accessToken, refreshToken: newRefreshToken,
        message: "Access token refreshed sucessfully"
      }
    )
  )
} catch (error) {
   throw new ApiError(401, error?.message || "Invalid refresh token")
}

})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
}