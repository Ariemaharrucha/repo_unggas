import express from 'express';
import adminController from '../../controllers/admin.controller.js';
import artikeController from '../../controllers/artikel.controller.js';
import dokterController from '../../controllers/dokter.conroller.js';
import upload from '../../middleware/upload.middleware.js';

export const adminRouter = express.Router();

adminRouter.post('/admin/create-admin', adminController.handleCreateAdmin);
adminRouter.get('/admin/user', adminController.handleGetAllUser);

// artikel
adminRouter.get('/admin/artikel', artikeController.handleGetArtikel);
adminRouter.get('/admin/artikel/:id', artikeController.handleGetArtikelId);
adminRouter.post('/admin/artikel', upload, artikeController.handleCreateArtikel);
adminRouter.put('/admin/artikel/:id', upload, artikeController.handleEditArtikel);
adminRouter.delete('/admin/artikel/:id', artikeController.handleDeleteArtkel);

// handle dokter
adminRouter.post('/admin/dokter', upload, dokterController.handleCreateDokter);
adminRouter.get('/admin/dokter', dokterController.hanleGetAllDokter);
