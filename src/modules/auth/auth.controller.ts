import { z } from 'zod';
import { type Request, type Response } from 'express';
import { registerUser } from './auth.service.js';
import { EmailAlreadyExistsError } from './auth.errors.js';

const registerSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
})

export async function register(req: Request, res: Response) {
    const parsedInput = registerSchema.safeParse(req.body)
    const isValidInput = parsedInput.success

    if (!isValidInput) return res.status(400).json(z.flattenError(parsedInput.error))

    try {
        const createdUser = await registerUser(parsedInput.data)
        return res.status(201).json(createdUser)
    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            return res.status(409).json({ message: error.message })
        }
        throw error
    }
}
