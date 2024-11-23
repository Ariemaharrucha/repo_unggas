import express from 'express';
import { adminRouter } from './adminRouter/admin.router.js';
import { authRouter } from './authRouter/auth.router.js';
import { dokterRouter } from './dokterRouter/dokter.router.js';
import { konsultasiRouter } from './konsultasiRouter/konsultasi.router.js';
import { messageRouter } from './messageRouter/message.router.js';
import { userRouter } from './userRouter/user.router.js';

export const Router = express();
const api = '/api/v1';

Router.use(api, adminRouter);
Router.use(api, authRouter);
Router.use(api, dokterRouter);
Router.use(api, konsultasiRouter);
Router.use(api, messageRouter)
Router.use(api, userRouter);
