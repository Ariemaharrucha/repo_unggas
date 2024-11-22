import { query } from "../config/db.js";

const messagesCotroller = {
  handleGetMessgaesByIdkonsultasiId: async (req, res) => {
    const { konsultasiId } = req.params;
    console.log(konsultasiId);

    try {
      const [messages] = await query(
        `SELECT sender_id, content, sent_at FROM messages WHERE konsultasi_id = ? ORDER BY sent_at ASC`,
        [konsultasiId]
      );
      res.status(200).json({ success: true, data: [messages] });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch messages" });
    }
  },
};

export default messagesCotroller;
