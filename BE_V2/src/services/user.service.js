import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";

const userService = {
  getAllUser: async () => {
    const users = await userModel.getUser();
    return users;
  },

  getUserById: async (id) => {
    const result = await userModel.getUserById(id);
    if(result == false) {
      throw new Error("user not found");
    }
    return result;
  },

  editUserProfile: async (id, data) => {
      const { username, email, password, image_profile } = data;

      if (!username || !email) {
          throw new Error("Username dan email harus diisi.");
      }

      let hashedPassword = null;
      if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
      }

      const result = await userModel.editUser(id, {
          username,
          email,
          password: hashedPassword,
          image_profile,
      });
      return result;
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

  getTotalUser: async () => {
    return userModel.getTotalUser();
  },

};

export default userService;
