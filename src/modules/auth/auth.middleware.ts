import { NextFunction, type Request, type Response } from 'express';
import { jwtVerify } from 'jose';
import { config } from '../../config.js';
import { findUserForAuthentication } from './auth.service.js';
import { UserNotExistError } from './auth.errors.js';
import { type ROLES } from '../../models/users.js';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (!authorization || authorization.split(" ")[0] !== "Bearer") {
        return res.status(401).json({ message: "missing authentication" })
    }

    const token = authorization.split(" ")[1]
    const secret = new TextEncoder().encode(config.JWT_SECRET)

    let userId
    try {
        const verifiedToken = await jwtVerify(token, secret, { algorithms: ['HS256'] })
        userId = (verifiedToken.payload.sub)
    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token" })
    }

    try {
        res.locals.user = await findUserForAuthentication(Number(userId))
    } catch (error) {
        if (error instanceof UserNotExistError) {
            return res.status(401).json({ message: error.message })
        }
        throw error
    }

    next()
}

export function requireRole(roles: ROLES[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = res.locals.user.role
        const roleFound = roles.includes(role)

        if (!roleFound) return res.status(403).json({ message: "permission denied" })
        next()
    }
}