import express from 'express';
import adminController from '../../controllers/admin.controller.js';
import upload from '../../middleware/upload.middleware.js';

export const adminRouter = express.Router();

adminRouter.post('/admin/create-admin', adminController.handleCreateAdmin);
adminRouter.get('/admin/user', adminController.handleGetAllUser);

// artikel
adminRouter.get('/admin/artikel', adminController.handleGetArtikel);
adminRouter.get('/admin/artikel/:id', adminController.handleGetArtikelId);
adminRouter.post('/admin/artikel', upload, adminController.handleCreateArtikel);
adminRouter.put('/admin/artikel/:id', upload, adminController.handleEditArtikel);
adminRouter.delete('/admin/artikel/:id', adminController.handleDeleteArtkel);

// handle dokter
adminRouter.post('/admin/dokter', upload, adminController.handleCreateDokter);
adminRouter.get('/admin/dokter', adminController.handleGetAllDokter);
