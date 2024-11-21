import { query } from "../config/db.js";

const userModel = {
  getUser: async () => {
    const sqlQuery = `SELECT * FROM users WHERE role = "user"`;
    return await query(sqlQuery);
  },

  getAllDokter: async () => {
    const sqlQuery = `SELECT * FROM users WHERE role = "dokter"`;
    return query(sqlQuery);
  },

  getUserById: async (id) => {
    const sqlQuery = `SELECT * FROM users WHERE id = ?`;
    return await query(sqlQuery, [id]);
  },

  getUserByEmail: async (email) => {
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;
    return await query(sqlQuery, [email]);
  },

  createUser: async (data) => {
    const { username, email, password, image_profile, role } = data;
    const sqlQuery = `INSERT INTO users (username, email, password,image_profile, role) VALUES (?, ?, ?, ?, ?)`;
    return await query(sqlQuery, [username, email, password, image_profile, role]);
  },

  editUser: async (id, data) => {
    const { username, email, password, role } = data;
    const sqlQuery = `UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
    return await query(sqlQuery, [username, email, password, role, id]);
  },

  deleteUser: async (id) => {
    const sqlQuery = `DELETE FROM users WHERE id = ?`;
    return await query(sqlQuery, [id]);
  },
};

export default userModel;
