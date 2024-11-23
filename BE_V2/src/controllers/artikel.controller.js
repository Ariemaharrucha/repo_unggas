import artikelService from "../services/artikel.service.js";

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
    const artikelImage = req.files.image_artikel
      ? `uploads/artikel/${req.files.image_artikel[0].filename}`
      : null;
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
    const artikelImage = req.files.image_artikel
      ? `uploads/artikel/${req.files.image_artikel[0].filename}`
      : req.body.image_artikel;
    try {
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
  }
};

export default artikeController