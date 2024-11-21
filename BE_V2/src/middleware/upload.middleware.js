import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExistence = (dir) => {
  if (fs.existsSync(dir)) {
    return true;
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let folder = path.join(__dirname, "../uploads/");
    if (file.fieldname === "image_profile") folder = path.join(folder, "userProfile");
    else if (file.fieldname === "image_artikel") folder = path.join(folder, "artikel");

    console.log(`Uploading file to: ${folder}`);
    ensureDirectoryExistence(folder)
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
}).fields([  
  { name: "image_artikel", maxCount: 1 },  
  { name: "image_profile", maxCount: 1 },  
  { name: "type", maxCount: 1 },           
]);

export default upload;
