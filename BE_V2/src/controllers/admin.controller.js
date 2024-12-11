import userService from "../services/user.service.js";

const adminController = {

  handleGetAllUser: async (req, res) => {
    try {
      const result = await userService.getAllUser();
      return res.status(200).json({ message: "success fetch", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch user" });
    }
  },

  handleGetNewUser: async (req, res) => {
    try {
      const result = await userService.getNewUser();
      return res.status(200).json({ message: "success fetch", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch user" });
    }
  },

  handleCreateAdmin: async (req, res) => {  
    try {
      const result = await userService.createAdmin(req.body);
      return res.status(201).json({ message: "success create admin", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },
};

export default adminController;
