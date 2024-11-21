import messagesCotroller from "../../controllers/messages.controller.js";
import express from 'express';

export const messageRouter =express.Router();

messageRouter.get('/messages/:konsultasiId', messagesCotroller.getMessgaesByIdkonsultasiId)