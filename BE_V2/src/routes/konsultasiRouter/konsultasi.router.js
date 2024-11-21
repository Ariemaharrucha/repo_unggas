import konsultasiController from "../../controllers/konsultasi.controller.js";
import express from 'express';

export const konsultasiRouter = express.Router();

konsultasiRouter.post("/konsultasi", konsultasiController.createKonsultasi);
