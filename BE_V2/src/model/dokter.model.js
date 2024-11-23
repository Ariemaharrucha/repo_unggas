import { query } from "../config/db.js";

const dokterModel = {

  getAllDokter: async () => {
    const sql = 
      `SELECT 
         u.user_id AS dokter_id, 
         u.username AS nama_dokter, 
         u.image_profile, 
         d.spesialis, 
         d.pengalaman, 
         d.jam_kerja 
       FROM dokter d
       JOIN users u ON d.dokter_id = u.user_id
       WHERE u.role = 'dokter'`;
    const result = await query(sql);
    return result;
  },

  getAllDokterForUser: async () => {
    const sql = 
      `SELECT 
         u.user_id AS dokter_id, 
         u.username AS nama_dokter, 
         u.image_profile, 
         d.spesialis, 
         d.pengalaman, 
         d.jam_kerja 
       FROM dokter d
       JOIN users u ON d.dokter_id = u.user_id
       WHERE u.role = 'dokter'`;
    const result = await query(sql);
    return result;
  },

  createDokter: async (data) => {
    const {
      dokter_id,
      nomer_str,
      nomer_telepon,
      spesialis,
      pengalaman,
      jam_kerja,
      alumni,
      tempat_praktek
    } = data;
    const sqlQuery = `INSERT INTO dokter (dokter_id, nomer_str, nomer_telepon, spesialis, pengalaman, jam_kerja, alumni, tempat_praktek) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return query(sqlQuery, [
      dokter_id,
      nomer_str,
      nomer_telepon,
      spesialis,
      pengalaman,
      jam_kerja,
      alumni,
      tempat_praktek
    ]);
  },

  getUserForDokter: async (dokterId) => {
    const sql = `SELECT u.user_id AS id, u.username, u.image_profile, k.konsultasi_id 
        FROM konsultasi k
        JOIN users u ON k.user_id = u.user_id
        WHERE k.dokter_id = ?`;
    return query(sql,[dokterId])
  }
};

export default dokterModel;