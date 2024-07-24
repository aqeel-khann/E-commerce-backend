const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_products", // Folder name in your Cloudinary account
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
