const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); // Get the current timestamp
    const fileExtension = path.extname(file.originalname); // Extract the file extension
    const originalNameWithoutExtension = path.basename(
      file.originalname,
      fileExtension
    ); 
    cb(null, `${uniqueSuffix}_${originalNameWithoutExtension}${fileExtension}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
