import authService from "../services/auth.service.js";

const authController = {
  handleRegister: async (req, res) => {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json({ message: "User registered successfully", data: result });
    } catch (error) {
      console.error(error);
      if (error.message === "Email already exists") {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
      }
    },

  handleLogin: async (req, res) => {
    try {
      const { accessToken } = await authService.login(req.body);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.status(200).json({message: "Login successful", accessToken});
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: error.message });
    }
  },
  
};

export default authController;
