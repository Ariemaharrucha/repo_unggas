import express from 'express';
import dokterController from '../../controllers/dokter.conroller.js';

export const dokterRouter = express.Router();

dokterRouter.post('/dokter/artikel', dokterController.createArtikeldokter);
dokterRouter.get('/dokter/artikel/:id', dokterController.getArtikeldokter);
dokterRouter.get("/dokter/list", dokterController.getAllDokter);
dokterRouter.get("/dokter/:dokterId/users", dokterController.getUsersForDokter);