import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async (localFilePath) => {
    try {
        //agr file path present nhi h to null return krdo
        if(!localFilePath) return null
       //upload file on cloudinary
       const response= await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto"
       })
       //file has been uploaded successfully
       console.log("file upload successful ", 
        response.url
       );
       return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //it remove the locally saved temporary
        //file as the upload operation got failed
        return null; 
    }


}

export {uploadOnCloudinary}





/*cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video", 
  public_id: "my_dog",
  overwrite: true, 
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result)); */