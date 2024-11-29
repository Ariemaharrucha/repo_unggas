import userService from "../services/user.service.js";
import cloudinary from "../config/cloudinary.js";

const userControllers = {
  handleGetUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await userService.getUserById(id);
      res.status(200).json({ message: "success fetch profile", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error get profile" });
    }
  },

  handleEditProfile: async (req, res) => {
    const { id } = req.params;
    try {
      if (req.file && req.body.image_profile) {
        const publicId = req.body.image_profile.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const fotoProfile = req.file ? req.file.path : req.body.image_profile;
      const password = req.body.password || null;

      const result = await userService.editUserProfile(id, {
        ...req.body,
        password,
        image_profile: fotoProfile,
      });

      return res
        .status(200)
        .json({ message: "Success edit profile", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error edit profile" });
    }
  },
};

export default userControllers;
