import { type Request, type Response, type NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    if (err instanceof SyntaxError) return res.status(400).json({ message: "invalid JSON" })
    return res.status(500).json({ message: "internal server error" })
}