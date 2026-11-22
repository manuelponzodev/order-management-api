import argon2 from 'argon2';
import { QueryError } from 'mysql2/promise';
import { addUser, findUser } from './auth.repository.js';
import { type Input } from './auth.repository.js';
import { EmailAlreadyExistsError } from './auth.errors.js';

interface ParsedInput {
    name: string
    email: string
    password: string
}

export async function createUser(user: Input) {
    const createdUserId = await addUser(user)
    return findUser(createdUserId)
}

async function seccureInput(input: ParsedInput){
    const passwordHashed = await argon2.hash(input.password)
    return {
        name: input.name,
        email: input.email,
        passwordHash: passwordHashed
    }
}

export async function registerUser(input: ParsedInput) {
    const seccuredInput = await seccureInput(input)

    try {
        return await createUser(seccuredInput)
    } catch (error) {
        if ((error as QueryError).code === "ER_DUP_ENTRY") {
            throw new EmailAlreadyExistsError()
        }
        throw error
    }
}