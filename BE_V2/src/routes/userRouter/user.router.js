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
userRouter.get('/artikel/kategori/:kategori', artikeController.handleGetArtikelKategori);
userRouter.get('/artikel/kategori/kesehatan-unggas', artikeController.handleGetArtikelKategoriKesehatanUnggas);
userRouter.get('/artikel/kategori/pakan', artikeController.handleGetArtikelKategoriPakan);
userRouter.get('/artikel/kategori/nutrisi', artikeController.handleGetArtikelKategoriNutrisi);
userRouter.get('/artikel/kategori/lingkungan', artikeController.handleGetArtikelKategoriLingkungan);