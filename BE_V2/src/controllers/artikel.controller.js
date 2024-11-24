import artikelService from "../services/artikel.service.js";
import cloudinary from "../config/cloudinary.js";

const artikeController = {
  handleGetArtikel: async (req, res) => {
    try {
      const result = await artikelService.getArtikel();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelId: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await artikelService.getArtikelById(id);
      if (!result) {
        throw new Error("artikel not found");
      }
      return res
        .status(200)
        .json({ message: "success get artikel", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error get artikel" });
    }
  },

  handleCreateArtikel: async (req, res) => {
    const artikelImage = req.file ? req.file.path : null;
    console.log(artikelImage);
    console.log(req.body);

    try {
      const result = await artikelService.createArtikel({
        ...req.body,
        image_artikel: artikelImage,
      });
      return res
        .status(201)
        .json({ message: "success create artikel", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error create artikel" });
    }
  },

  handleEditArtikel: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);

    try {

      if (req.file && req.body.image_artikel) {
        const publicId = req.body.image_artikel.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      };

      const artikelImage = req.file ? req.file.path : req.body.image_artikel;
      const result = await artikelService.editArtikel(id, {
        ...req.body,
        image_artikel: artikelImage,
      });
      return res
        .status(200)
        .json({ message: "success edit artikel", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error edit artikel" });
    }
  },

  handleDeleteArtkel: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await artikelService.deleteArtikel(id);
      if (!result) {
        throw new Error("artikel not found");
      }
      return res.status(200).json({ message: "deleting succes" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error create artikel" });
    }
  },

  handleGetArtikelForUSer: async (req, res) => {
    try {
      const result = await artikelService.getArtikelForUser();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelKategori: async (req, res) => {
    const { kategori } = req.params;
    try {
      const result = await artikelService.getArtikelKategori(kategori);
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelKategoriKesehatanUnggas: async (req, res) => {
    try {
      const result = await artikelService.getArtikelKategoriKesehatanUnggas();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelKategoriNutrisi: async (req, res) => {
    try {
      const result = await artikelService.getArtikelKategoriNutrisi();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelKategoriPakan: async (req, res) => {
    try {
      const result = await artikelService.getArtikelKategoriPakan();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

  handleGetArtikelKategoriLingkungan: async (req, res) => {
    try {
      const result = await artikelService.getArtikelKategoriLingkungan();
      return res.status(200).json({ message: "success fetch", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetch artikel" });
    }
  },

};

export default artikeController