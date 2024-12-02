import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { dbConnection } from './config/db.js';
import { Router } from './routes/index.js';
import { Server } from 'socket.io';
import { query } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();
const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: '*',
    methods: ["GET","POST"],
    credentials: true
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (konsultasiId) => {
    socket.join(konsultasiId);
    console.log(`User joined room: ${konsultasiId}`);
  });

  socket.on("sendMessage", async ({ konsultasiId, senderId, content }) => {
    console.log(konsultasiId, senderId, content);
    try {
      const result = await query(
        `INSERT INTO messages (konsultasi_id, sender_id, content) VALUES (?, ?, ?)`,
        [konsultasiId, senderId, content]
      );
  
      const [newMessage] = await query(
        `SELECT message_id, konsultasi_id, sender_id AS senderId, content, sent_at FROM messages WHERE message_id = ?`,
        [result.insertId]
      );

      io.in(konsultasiId).emit("receiveMessage", newMessage);
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
});
