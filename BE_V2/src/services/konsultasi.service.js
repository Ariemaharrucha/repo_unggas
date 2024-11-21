import { query } from "../config/db.js";

const konsultasiService = {
    createKonsultasi: async ({user_id, dokter_id}) => {       
        const sql = `INSERT INTO konsultasi (user_id, dokter_id) VALUES (?, ?)`;
        const result = await query(sql, [user_id, dokter_id]);
        return result;
    },

    checkKonsultasiExists: async (user_id, dokter_id) => {
        const sql = `SELECT * FROM konsultasi WHERE user_id = ? AND dokter_id = ?`;
        const result = await query(sql, [user_id, dokter_id]);
        return result;
    }
}

export default konsultasiService