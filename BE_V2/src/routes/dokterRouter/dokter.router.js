import express from 'express';
import artikeController from '../../controllers/artikel.controller.js';
import dokterController from '../../controllers/dokter.conroller.js';
import { upload } from '../../middleware/upload.middleware.js';
import userControllers from '../../controllers/user.controller.js';

export const dokterRouter = express.Router();

dokterRouter.get('/dokter/artikel/:id', dokterController.handleGetArtikelDokter);
dokterRouter.get('/dokter/artikel/:id', artikeController.handleGetArtikelId);
dokterRouter.post('/dokter/artikel', upload.single('image_artikel'), artikeController.handleCreateArtikel);
dokterRouter.put('/dokter/artikel/:id', upload.single('image_artikel'), artikeController.handleEditArtikel);
dokterRouter.delete('/dokter/artikel/:id', artikeController.handleDeleteArtkel);

// edit profile
dokterRouter.get('/dokter/profile/:id', userControllers.handleGetUserById);
dokterRouter.put('/dokter/profile/:id', upload.single('image_profile'), userControllers.handleEditProfile);
dokterRouter.get('/dokter/profile-details/:id', dokterController.handleGetDetailDokter);
dokterRouter.put('/dokter/profile-details/:id', dokterController.handleEditDetailDokter);

// client
dokterRouter.get("/dokter/list", dokterController.hanleGetAllDokterForUser);
dokterRouter.get("/dokter/:dokterId/users", dokterController.hanleGetUsersForDokter);