import { Router } from 'express';
import { z } from 'zod';

export const authRouter = Router();

const registerSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
})

authRouter.post('/register', (req, res) => {
    const result = registerSchema.safeParse(req.body)
    const isValidInput = result.success

    if (!isValidInput) {
        return res.status(400).json(z.flattenError(result.error))
    }
    return res.status(201).json(result.data)
})
