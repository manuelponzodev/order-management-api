import { Router } from 'express';
import { register } from './auth.controller.js';

export const authRouter = Router();

// POST
authRouter.post('/register', register)

