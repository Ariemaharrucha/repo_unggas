import konsultasiService from "../services/konsultasi.service.js";
const konsultasiController = {
  createKonsultasi: async (req, res) => {
    const { user_id, dokter_id } = req.body;
    // console.log(user_id, dokter_id);
    
    try {

      // const existingKonsultasi = await konsultasiService.checkKonsultasiExists(
      //   user_id,
      //   dokter_id
      // );

      // if (existingKonsultasi) {
      //   return res.status(200).json({
      //     message: "Konsultasi already exists",
      //     data: existingKonsultasi,
      //   });
      // }

      const result = await konsultasiService.createKonsultasi({ user_id, dokter_id });
      
      res.status(201).json({ message: "Konsultasi created", data: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating konsultasi" });
    }
  },
};

export default konsultasiController;
