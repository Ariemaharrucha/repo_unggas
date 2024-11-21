import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
import artikelModel from "../model/artikel.model.js";
import dokterModel from "../model/dokter.model.js";
import { query } from "../config/db.js";

const adminService = {
  getAllUser: async () => {
    const users = await userModel.getUser();
    return users;
  },

  getAllDokter: async () => {
    return userModel.getAllDokter();
  },

  createAdmin: async (data) => {
    const {
      username,
      email,
      password,
      image_profile = null,
      role = "admin",
    } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.createUser({
      username,
      email,
      password: hashedPassword,
      image_profile,
      role,
    });
  },

  // admin handle dokter
  createDokter: async (data) => {
    const {
      username,
      email,
      password,
      image_profile,
      nomer_str,
      nomer_telepon,
      spesialis,
      pengalaman,
      jam_kerja,
    } = data;

    const cekEmail = await userModel.getUserByEmail(email);
    const cekNomerStr = await query(
      `SELECT * FROM dokter WHERE nomer_str = ?`,
      [nomer_str]
    );

    if (cekEmail.length > 0 || cekNomerStr.length > 0)
      throw new Error("Email already and Nomer Str exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDokter = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      image_profile,
      role: "dokter",
    });
    console.log(newDokter);

    await dokterModel.createDokter({
      dokter_id: newDokter.insertId,
      nomer_str,
      nomer_telepon,
      spesialis,
      pengalaman,
      jam_kerja,
    });
    return newDokter;
  },

  // artikel
  getArtikel: async () => {
    return artikelModel.getArtikel();
  },

  getArtikelById: async (id) => {
    return artikelModel.getArtikelById(id);
  },

  createArtikel: async (data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    } = data;
    console.log(data);
    
    return artikelModel.createArtikel({
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    });
  },

  editArtikel: async (id, data) => {
    const {
      judul,
      author_name,
      konten,
      image_artikel,
      kategori,
      tanggal,
      author_id,
    } = data;
    if (!judul || !konten || !kategori) {
      throw new Error("Judul, teks, dan kategori artikel harus diisi.");
    }

    return artikelModel.editArtikel(id, data);
  },

  deleteArtikel: async (id) => {
    const artikel = await artikelModel.getArtikelById(id);
    if (!artikel) {
      throw new Error("Artikel tidak ditemukan.");
    }
    return artikelModel.deleteArtikel(id);
  },
};

export default adminService;
