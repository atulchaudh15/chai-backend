import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

/*cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async (localFilePath) => {
    try {
        //agr file path present nhi h to null return krdo
        if(!localFilePath){
            console.log("File path invalid or not provided.");
            return null;
        }
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


} */

  /*  
// Step 1: Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Step 2: Upload Function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("❌ File path invalid or not provided.");
      return null;
    }

    // Step 3: Upload File
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded successfully:", response.url);

    // Step 4: Delete Local Temp File
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};



export {uploadOnCloudinary}

*/


// src/utils/cloudinary.js
import dotenv from "dotenv";

dotenv.config();  // 👈 isko lagana zaroori hai agar yeh file directly run ho rahi ho

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("✅ Uploaded to Cloudinary:", response.url);

    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    return null;
  } finally {
    fs.unlinkSync(localFilePath); // Always remove temp file
  }
};

export { uploadOnCloudinary };




/*cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video", 
  public_id: "my_dog",
  overwrite: true, 
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result)); */