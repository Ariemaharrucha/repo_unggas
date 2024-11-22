import { query } from "../config/db.js";
import dokterService from "../services/dokter.service.js";

const dokterController = {
  hanleGetAllDokter: async (req, res) => {
    try {
      const result = await dokterService.getAllDokter();
      return res.status(200).json({ message: "success fetch", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch" });
    }
  },

  hanleGetAllDokterForUser: async (req, res) => {
    try {
      const result = await dokterService.getAllDokterForUser();
      return res.status(200).json({ message: "success fetch", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch" });
    }
  },

  handleCreateArtikeldokter: async (req, res) => {
    try {
      const result = await dokterService.createArtikeldokter(req.body);
      return res.status(201).json({ message: "success create artikel", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  handleGetArtikeldokter: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await dokterService.getArtikeldokter(id);
      return res.status(200).json({ message: "success fetch artikel by dokter", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch" });
    }
  },

  hanleGetUsersForDokter: async (req, res) => {
    const { dokterId } = req.params;
    try {
      const users = await dokterService.getUserForDokter(dokterId)
      res.status(200).json({ message: "success get users", data: users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

};

export default dokterController;