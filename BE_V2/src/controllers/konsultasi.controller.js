import konsultasiService from "../services/konsultasi.service.js";
const konsultasiController = {
   findOrCreateKonsultasi: async (req, res) => {
    const { user_id, dokter_id } = req.body;
    try {
      const result = await konsultasiService.findOrCreateKonsultasi(
        user_id,
        dokter_id
      );
      res
        .status(200)
        .json({
          message: "Konsultasi found or created",
          data: result.konsultasi_id,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error processing konsultasi" });
    }
  },
};

export default konsultasiController;
