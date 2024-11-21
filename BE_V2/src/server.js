import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { dbConnection } from './config/db.js';
import { Router } from './routes/index.js';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { query } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: '*',
    methods: ["GET","POST"],
    credentials: true
  }
})

dbConnection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(Router)

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (konsultasiId) => {
    socket.join(konsultasiId);
    console.log(`User joined room: ${konsultasiId}`);
  });

  socket.on("sendMessage", async ({ konsultasiId, senderId, content }) => {
    console.log(konsultasiId, senderId, content);
    try {
      await query(
        `INSERT INTO messages (konsultasi_id, sender_id, content) VALUES (?, ?, ?)`,
        [konsultasiId, senderId, content]
      );

      // Kirim pesan ke semua user di room
      io.in(konsultasiId).emit("receiveMessage", { senderId, content });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.APP_PORT, async () => {
    console.log(`server is running at ${process.env.APP_PORT}`)
})
