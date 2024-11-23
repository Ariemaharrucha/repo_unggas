import userService from "../services/user.service.js";

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
    const fotoProfile = req.files.image_profile
      ? `uploads/userProfile/${req.files.image_profile[0].filename}`
      : req.body.image_profile;
    try {
      const result = await userService.editUserProfile(id, {
        ...req.body,
        image_profile: fotoProfile,
      });
      return res
        .status(200)
        .json({ message: "success edit profile", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error edit profile" });
    }
  },
};

export default userControllers;
