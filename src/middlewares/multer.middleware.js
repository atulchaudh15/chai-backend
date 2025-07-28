import multer from "multer";

/*
//hm log multer ko as a middleware use kr rhe h pehle file cloudinary p uplod hone s pehle hmare server p rhegi 
//aur hm log file ko rkh rhe h disk storage m (memory m agr rkhenge to vo fill ho skti h)
//const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    //yhn p hum log file ka name unique b bna skte h (baad m try krunga)
    cb(null, file.originalname)
  }
//})

//export const upload = multer({ 
    storage,
//})
*/

import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "public/temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  }
});

export const upload = multer({ storage });
