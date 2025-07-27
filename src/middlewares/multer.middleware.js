import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    //yhn p hum log file ka name unique b bna skte h (baad m try krunga)
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage,
})