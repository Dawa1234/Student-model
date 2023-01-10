const multer = require("multer");
const path = require("path");

// Where to store the image in local disk.
const storageDisk = multer.diskStorage({
  // path to store
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  // change filename.
  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extension}`);
  },
});

// Upload only limited extensions.
const fileExtensionFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
    return cb(new Error("Image format not accepted."), false);
  }
  cb(null, true);
};

const uploadImage = multer({
  storage: storageDisk,
  fileFilter: fileExtensionFilter,
  limits: 2 * 1024 * 1024, // 2 MB
});

module.exports = uploadImage;
