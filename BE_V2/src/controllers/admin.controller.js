import adminService from "../services/admin.service.js";

const adminController = {

  getAllUser: async (req, res) => {
    try {
      const result = await adminService.getAllUser();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch user" });
    }
  },

  createAdmin: async (req, res) => {  
    try {
      const result = await adminService.createAdmin(req.body);
      return res.status(201).json({ message: "User registered successfully", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  // crud dokter
  getAllDokter: async (req, res) => {
    try {
      const result = await adminService.getAllDokter();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch dokter" });
    }
  },

  createDokter: async (req, res) => {
    const {username, email, password, nomer_str, nomer_telepon, spesialis, pengalaman, jam_kerja} = req.body;
    const imageProfie = req.files.image_profile
      ? `uploads/userProfile/${req.files.image_profile[0].filename}`
      : null;
    console.log(imageProfie);
    
    try {
      const result = await adminService.createDokter({username, email, password, nomer_str, nomer_telepon,image_profile: imageProfie, spesialis, pengalaman, jam_kerja});
      return res.status(201).json({ message: "add dokter successfully", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  },

  // artikel
  getArtikel: async (req, res) => {
    try {
      const result = await adminService.getArtikel();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  getArtikelId: async (req, res) => {
    const {id} = req.params;
    try {
      const result = await adminService.getArtikelById(id);
      if(!result) {
        throw new Error("artikel not found");
      }
      return res.status(200).json({data: result})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'error get artikel'})      
    }
  },

  createArtikel: async (req, res) => {
    const artikelImage = req.files.image_artikel ? `uploads/artikel/${req.files.image_artikel[0].filename}` : null;
    console.log(artikelImage);
    console.log(req.body);
    
    try {
      const result = await adminService.createArtikel({...req.body, image_artikel: artikelImage});
      return res.status(201).json({ message: "succes create artikel", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error create artikel" });
    }
  },

  editArtikel: async (req, res) => {
    const { id } = req.params
    console.log(id);
    console.log(req.body);
    const artikelImage = req.files.image_artikel ? `uploads/artikel/${req.files.image_artikel[0].filename}` : req.body.image_artikel;
    try {
      const result = await adminService.editArtikel(id, {...req.body, image_artikel: artikelImage})
      return res.status(200).json({ message: "Artikel berhasil diupdate", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error edit artikel" });
    }
  },

  deleteArtkel: async (req, res) => {
    const {id} = req.params;
    try {
      const result = await adminService.deleteArtikel(id);
      if(!result) {
        throw new Error('artikel not found')
      }
      return res.status(200).json({message: "deleting succes"})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error create artikel" });
    }
  }
};

export default adminController;
