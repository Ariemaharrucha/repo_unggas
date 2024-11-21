import { query } from "../config/db.js";
import dokterService from "../services/dokter.service.js";

const dokterController = {
  getAllDokter: async (req, res) => {
    try {
      const result = await dokterService.getAllDokter();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch" });
    }
  },

  createArtikeldokter: async (req, res) => {
    try {
      const dokter = await dokterService.createArtikeldokter(req.body);
      return res.status(201).json({ message: "success create artikel", data: dokter });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  getArtikeldokter: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await dokterService.getArtikeldokter(id);
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch" });
    }
  },

  getUsersForDokter: async (req, res) => {
    const { dokterId } = req.params;
    try {
      const sql = `
        SELECT u.user_id AS id, u.username, k.konsultasi_id 
        FROM konsultasi k
        JOIN users u ON k.user_id = u.user_id
        WHERE k.dokter_id = ?
      `;
      const users = await query(sql, [dokterId]);
      res.status(200).json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

};

export default dokterController;