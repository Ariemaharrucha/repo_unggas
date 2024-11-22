import { query } from "../config/db.js";

const messagesCotroller = {
  handleGetMessgaesByIdkonsultasiId: async (req, res) => {
    const { konsultasiId } = req.params;
    console.log(konsultasiId);

    try {
      const rows = await query(
        `SELECT sender_id AS senderId, content FROM messages WHERE konsultasi_id = ? `,
        [konsultasiId]
      );
      res.status(200).json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch messages" });
    }
  },
};

export default messagesCotroller;
