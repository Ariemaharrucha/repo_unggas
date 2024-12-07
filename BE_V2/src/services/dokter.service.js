import artikelModel from "../model/artikel.model.js";
import dokterModel from "../model/dokter.model.js";
import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt'
import { query } from "../config/db.js";

const dokterService = {

    getAllDokter: async () => {
        const result = await dokterModel.getAllDokter();
        return result;
    },

    getAllDokterForUser: async () => {
        const result = await dokterModel.getAllDokterForUser();
        return result
    },

    getDetailDokter: async (id) => {
      const result = await dokterModel.getDetailDokterById(id);
      return result;
    },

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
          alumni,
          tempat_praktek
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
          alumni,
          tempat_praktek
        });
        return newDokter;
    },

    editDataDiriDokter: async (id, data) => {
      const { nomer_str, nomer_telepon, spesialis, pengalaman, jam_kerja, alumni, tempat_praktek } = data;
      if(!nomer_str || !nomer_telepon || !spesialis || !pengalaman || !jam_kerja || !alumni || !tempat_praktek) {
        console.error("Missing required fields:", data);
        throw new Error("Semua kolom harus diisi");
      }
      console.log(nomer_str, nomer_telepon, spesialis, pengalaman, jam_kerja, alumni, tempat_praktek);
      
      const result = await dokterModel.editDokter(id, data);
      return result;
    },

    deleteDokter: async (id) => {
      return await dokterModel.deleteDokter(id);
      
    },

    getArtikeldokter: async (id) => {
        const result = await artikelModel.getArtikelByAuthorId(id);
        return result;
    },

    getUserForDokter: async (dokterId) => {
        const result = await dokterModel.getUserForDokter(dokterId);
        return result;
    },

    getTotalDokter: async () => {
      const result = await dokterModel.getTotalDokter();
      return result;
    }
};

export default dokterService;