import { Router } from 'express';
import { register, login } from './auth.controller.js';

export const authRouter = Router();

// POST
authRouter.post('/register', register)
authRouter.post('/login', login)

