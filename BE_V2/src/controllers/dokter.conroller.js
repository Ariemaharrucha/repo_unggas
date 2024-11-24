import dokterService from "../services/dokter.service.js";

const dokterController = {
  handleCreateDokter: async (req, res) => {
    const {username, email, password, nomer_str, nomer_telepon, spesialis, pengalaman, jam_kerja, alumni, tempat_praktek} = req.body;
    const imageProfie = req.files.image_profile
      ? `uploads/userProfile/${req.files.image_profile[0].filename}`
      : null;
    console.log(imageProfie);
    
    try {
      const result = await dokterService.createDokter({username, email, password, nomer_str, nomer_telepon,image_profile: imageProfie, spesialis, pengalaman, jam_kerja, alumni, tempat_praktek});
      return res.status(201).json({ message: "add dokter successfully", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

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

  handleGetDetailDokter: async (req, res) => {
    const {id} = req.params;
    try {
      const result = await dokterService.getDetailDokter(id);
      res.status(200).json({ message: "success get users", data: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  handleEditDetailDokter: async (req, res) => {
    const {id} = req.params;
    console.log("Body Data:", req.body);
    try {
      const result = await dokterService.editDataDiriDokter(id, req.body);
      return res.status(201).json({ message: "edit details dokter successfully", data: result});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  handleGetArtikelDokter: async (req, res) => {
    const {id} = req.params;
    try {
      const result = await dokterService.getArtikeldokter(id);
      res.status(200).json({ message: "success get users", data: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

};

export default dokterController;