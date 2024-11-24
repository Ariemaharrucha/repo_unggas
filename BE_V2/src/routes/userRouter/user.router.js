import artikeController from "../../controllers/artikel.controller.js";
import userControllers from "../../controllers/user.controller.js";
import express from 'express';
import { upload } from "../../middleware/upload.middleware.js";

export const userRouter = express.Router();

userRouter.get('/profile/:id', userControllers.handleGetUserById);
userRouter.put('/profile/:id', upload.single('image_profile'), userControllers.handleEditProfile);
userRouter.get('/artikel', artikeController.handleGetArtikel);
userRouter.get('/artikel/:id', artikeController.handleGetArtikelId);

//get artikel by kategori
userRouter.get('/artikel/:kategori', artikeController.handleGetArtikelKategori);
userRouter.get('/artikel/kesehatan-unggas', artikeController.handleGetArtikelKategoriKesehatanUnggas);
userRouter.get('/artikel/pakan', artikeController.handleGetArtikelKategoriPakan);
userRouter.get('/artikel/nutrisi', artikeController.handleGetArtikelKategoriNutrisi);
userRouter.get('/artikel/lingkungan', artikeController.handleGetArtikelKategoriLingkungan);