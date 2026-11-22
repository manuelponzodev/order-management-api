import { Router } from 'express';
import { register, login, getUser } from './auth.controller.js';
import { authenticate } from './auth.middleware.js';

export const authRouter = Router();

// GET
authRouter.get('/me', authenticate, getUser)
// POST
authRouter.post('/register', register)
authRouter.post('/login', login)

