import { pool } from '../../db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface RegisterInput {
    name: string
    email: string
    passwordHash: string
}

export async function addUser(user: RegisterInput) {
    const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [user.name, user.email, user.passwordHash]
    )
    return result.insertId
}

export async function findUserById(userId: number) {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id, name, email, role FROM users WHERE id = ? AND deleted_at IS NULL", [userId]
    )
    return rows[0]
}

export async function findUserByEmail(email: string) {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id, name, email, password_hash, role FROM users WHERE email = ? AND deleted_at IS NULL", [email]
    )
    return rows[0]
}