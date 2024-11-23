import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";

const userService = {
  getAllUser: async () => {
    const users = await userModel.getUser();
    return users;
  },

  createAdmin: async (data) => {
    const {
      username,
      email,
      password,
      image_profile = null,
      role = "admin",
    } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.createUser({
      username,
      email,
      password: hashedPassword,
      image_profile,
      role,
    });
  },

};

export default userService;
