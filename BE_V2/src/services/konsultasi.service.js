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
    }
}

export default konsultasiService