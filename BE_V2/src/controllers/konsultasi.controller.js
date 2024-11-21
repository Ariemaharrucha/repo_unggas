import konsultasiService from "../services/konsultasi.service.js";
const konsultasiController = {
  createKonsultasi: async (req, res) => {
    const { user_id, dokter_id } = req.body;
    
    try {
      const result = await konsultasiService.createKonsultasi({ user_id, dokter_id });
      res.status(201).json({ message: "Konsultasi created", data: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating konsultasi" });
    }
  },
};

export default konsultasiController;
