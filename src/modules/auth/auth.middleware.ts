import { NextFunction, type Request, type Response } from 'express';
import { jwtVerify } from 'jose';
import { config } from '../../config.js';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (!authorization || authorization.split(" ")[0] !== "Bearer") {
        return res.status(401).json({ message: "missing authentication" })
    }

    const token = authorization.split(" ")[1]
    const secret = new TextEncoder().encode(config.JWT_SECRET)

    try {
        const verifiedToken = await jwtVerify(token, secret, { algorithms: ['HS256'] })
        res.locals.userId = verifiedToken.payload.sub
    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token" })
    }

    next()
}