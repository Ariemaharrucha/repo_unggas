import authService from "../services/auth.service.js";

const authController = {
  handleRegister: async (req, res) => {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  handleLogin: async (req, res) => {
    try {
      const { accessToken } = await authService.login(req.body);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.status(200).json(accessToken);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: error.message });
    }
  },
  
};

export default authController;
