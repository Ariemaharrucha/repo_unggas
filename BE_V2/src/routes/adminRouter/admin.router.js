import express from 'express';
import adminController from '../../controllers/admin.controller.js';
import upload from '../../middleware/upload.middleware.js';

export const adminRouter = express.Router();

adminRouter.post('/admin/create-admin', adminController.createAdmin);
adminRouter.get('/admin/user', adminController.getAllUser);

// artikel
adminRouter.get('/admin/artikel', adminController.getArtikel);
adminRouter.get('/admin/artikel/:id', adminController.getArtikelId);
adminRouter.post('/admin/artikel', upload, adminController.createArtikel);
adminRouter.put('/admin/artikel/:id', upload, adminController.editArtikel);
adminRouter.delete('/admin/artikel/:id', adminController.deleteArtkel);

// dokter
adminRouter.post('/admin/dokter', upload, adminController.createDokter);
adminRouter.get('/admin/dokter', adminController.getAllDokter);
