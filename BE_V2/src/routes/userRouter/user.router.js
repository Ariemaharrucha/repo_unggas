import artikeController from "../../controllers/artikel.controller.js";
import express from 'express';

export const userRouter = express.Router();

userRouter.get('/artikel', artikeController.handleGetArtikel);
userRouter.get('/artikel/:id', artikeController.handleGetArtikelId)