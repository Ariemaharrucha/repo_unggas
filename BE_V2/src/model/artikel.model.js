import { query } from "../config/db.js";

const artikelModel = {
  createArtikel: async (data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
      role
    } = data;
    const sqlQuery = `INSERT INTO artikel (judul, author_name, konten, image_artikel, kategori, tanggal, author_id, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return await query(sqlQuery, [
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
      role
    ]);
  },

  getArtikel: async () => {
    const sqlQuery = `SELECT * FROM artikel`;
    return await query(sqlQuery);
  },

  getArtikelById: async (id) => {
    const sqlQuery = `SELECT * FROM artikel WHERE artikel_id = ?`;
    return await query(sqlQuery, [id]);
  },

  getArtikelByAuthorId: async (author_id) => {
    const sqlQuery = `SELECT * FROM artikel WHERE author_id = ?`;
    return await query(sqlQuery, [author_id]);
  },

  editArtikel: async (id, data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      role
    } = data;
    const sqlQuery = `UPDATE artikel SET judul = ?, author_name = ?, konten = ?, image_artikel = ?, kategori = ?, tanggal = ?, role = ? WHERE artikel_id = ?`;
    return await query(sqlQuery, [
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      role,
      id,
    ]);
  },

  deleteArtikel: async (id) => {
    const sqlQuery = `DELETE FROM artikel WHERE artikel_id = ?`;
    return await query(sqlQuery, [id]);
  },
};

export default artikelModel;
