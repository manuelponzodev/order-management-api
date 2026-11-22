import { pool } from '../../db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface Input {
    name: string
    email: string
    passwordHash: string
}

export async function addUser(user: Input) {
    const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [user.name, user.email, user.passwordHash]
    )
    return result.insertId
}

export async function findUser(userId: number) {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id, name, email FROM users WHERE id = ?", [userId]
    )
    return rows[0]
}