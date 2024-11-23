import express from 'express';
import artikeController from '../../controllers/artikel.controller.js';
import dokterController from '../../controllers/dokter.conroller.js';
import upload from '../../middleware/upload.middleware.js';

export const dokterRouter = express.Router();

dokterRouter.post('/dokter/artikel', upload, artikeController.handleCreateArtikel  );
dokterRouter.get('/dokter/artikel/:id', dokterController.handleGetArtikelDokter );

// client
dokterRouter.get("/dokter/list", dokterController.hanleGetAllDokterForUser);
dokterRouter.get("/dokter/:dokterId/users", dokterController.hanleGetUsersForDokter);