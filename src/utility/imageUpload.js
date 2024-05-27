const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const baseName = path.parse(file.originalname).name;
    cb(null, `${baseName}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(new Error("no image selected"));
  }
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    cb(new Error("Only image files (jpg, jpeg, png) are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

module.exports = {
  upload,
};
