import express from 'express';
import dokterController from '../../controllers/dokter.conroller.js';

export const dokterRouter = express.Router();

dokterRouter.post('/dokter/artikel', dokterController.handleCreateArtikeldokter);
dokterRouter.get('/dokter/artikel/:id', dokterController.handleGetArtikeldokter);
dokterRouter.get("/dokter/list", dokterController.hanleGetAllDokter);
dokterRouter.get("/dokter/:dokterId/users", dokterController.hanleGetUsersForDokter);