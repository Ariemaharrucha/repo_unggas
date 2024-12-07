import { query } from "../config/db.js";

const userModel = {
  getUser: async () => {
    const sqlQuery = `SELECT username,  image_profile, email, role, created_at FROM users WHERE role = "user" LIMIT 10`;
    return await query(sqlQuery);
  },

  getUserById: async (id) => {
    const sqlQuery = `SELECT * FROM users WHERE user_id = ?`;
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
	    const { username, email, image_profile, password } = data;

	    const sqlQuery = password
		? `UPDATE users SET username = ?, email = ?, password = ?, image_profile = ? WHERE user_id = ?`
		: `UPDATE users SET username = ?, email = ?, image_profile = ? WHERE user_id = ?`;

	    const params = password
		? [username, email, password, image_profile, id]
		: [username, email, image_profile, id];

	    return await query(sqlQuery, params);
	},

  deleteUser: async (id) => {
    const sqlQuery = `DELETE FROM users WHERE id = ?`;
    return await query(sqlQuery, [id]);
  },

  getTotalUser: async () => {
    const sqlQuery = `SELECT COUNT(*) AS total FROM users WHERE role = "user"`;
    return await query(sqlQuery);
  },
};

export default userModel;
