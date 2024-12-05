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
    } = data;
    const sqlQuery = `UPDATE artikel SET judul = ?, author_name = ?, konten = ?, image_artikel = ?, kategori = ?, tanggal = ? WHERE artikel_id = ?`;
    return await query(sqlQuery, [
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      id,
    ]);
  },

  deleteArtikel: async (id) => {
    const sqlQuery = `DELETE FROM artikel WHERE artikel_id = ?`;
    return await query(sqlQuery, [id]);
  },

  getArtikeForUser: async () => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, kategori, tanggal FROM artikel`;
    return await query(sqlQuery);
  },

  getArtikelKategoriKesehatanUnggas: async () => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, tanggal FROM artikel WHERE kategori = 'kesehatan-unggas'`;
    return await query(sqlQuery);
  },

  getArtikelKategoriPakan: async () => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, tanggal FROM artikel WHERE kategori = 'pakan'`;
    return await query(sqlQuery);
  },

  getArtikelKategoriNutrisi: async () => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, tanggal FROM artikel WHERE kategori = 'nutrisi'`;
    return await query(sqlQuery);
  },

  getArtikelKategorLingkungan: async () => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, tanggal FROM artikel WHERE kategori = 'lingkungan'`;
    return await query(sqlQuery);
  },

  getArtikelKategori: async (kategori) => {
    const sqlQuery = `SELECT artikel_id, judul, author_name, konten, image_artikel, tanggal FROM artikel WHERE kategori = ?`;
    return await query(sqlQuery, [kategori]);
  },

  getNewArtikel: async () => {
    const sqlQuery = `SELECT artikel_id, judul, konten, image_artikel, kategori, tanggal 
      FROM artikel 
      ORDER BY tanggal DESC 
      LIMIT 3`;
    return await query(sqlQuery);
  }

};

export default artikelModel;
