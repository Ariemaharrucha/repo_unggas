import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../config/db.js";

const authService = {
  register: async (data) => {
    const { username, email, password, image_profile = null, role = "user" } = data;
    const cekEmail = await query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (cekEmail.length > 0) throw new Error("Email already exists");

    const sqlQuery = `INSERT INTO users (username, email, password, image_profile, role) VALUES (?, ?, ?, ?, ?)`;
    const hashPassword = await bcrypt.hash(password, 10);
    return query(sqlQuery, [username, email, hashPassword, image_profile, role]);
  },

  login: async (data) => {
    const { email, password } = data;
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;
    try {
      const result = await query(sqlQuery, [email]);

      if (!result || result.length === 0) throw new Error("User not found");
      const user = result[0];
      // console.log(user);
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) throw new Error("Invalid password");

      const payload = {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image_profile
      };

      console.log(payload);

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      return {accessToken};
    } catch (error) {
      console.error(error);
      throw error;}
  },
};

export default authService;
