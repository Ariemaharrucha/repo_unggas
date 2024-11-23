import express from 'express';
import authController from '../../controllers/auth.controller.js';

export const authRouter = express.Router();

authRouter.post('/register', authController.handleRegister);
authRouter.post('/login', authController.handleLogin);