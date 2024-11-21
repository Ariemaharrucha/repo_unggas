import { query } from "../config/db.js";

const konsultasiService = {
  findOrCreateKonsultasi: async (user_id, dokter_id) => {
    // Cek room
    const checkSql = `SELECT konsultasi_id FROM konsultasi WHERE user_id = ? AND dokter_id = ?`;
    const existingRoom = await query(checkSql, [user_id, dokter_id]);

    if (existingRoom.length > 0) {
      return existingRoom[0];
    }

    //buat room baru
    const createSql = `INSERT INTO konsultasi (user_id, dokter_id) VALUES (?, ?)`;
    const result = await query(createSql, [user_id, dokter_id]);
    return { konsultasi_id: result.insertId };
  },

  getDokterForUser: async (user_id) => {
    const sql = `
        SELECT 
            d.dokter_id AS id, 
            d.spesialis, 
            u.image_profile, 
            u.username, 
            k.konsultasi_id
        FROM konsultasi k
        JOIN dokter d ON k.dokter_id = d.dokter_id
        JOIN users u ON k.dokter_id = u.user_id
        WHERE k.user_id = ?;
    `;
    const result = await query(sql, [user_id]);
    return result;
  },
};

export default konsultasiService;
