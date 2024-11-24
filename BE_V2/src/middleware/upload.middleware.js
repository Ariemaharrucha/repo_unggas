import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folderName = file.fieldname === 'image_artikel' ? 'artikel' : 'userProfile';
    return {
      folder: folderName,
      allowed_formats: ['jpeg', 'png', 'jpg'],
      resource_type: 'image',
    };
  },
});

export const upload = multer({ storage });