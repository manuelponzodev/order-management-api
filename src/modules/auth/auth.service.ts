import argon2 from 'argon2';
import { QueryError } from 'mysql2/promise';
import { addUser, findUserByEmail, findUserById } from './auth.repository.js';
import { EmailAlreadyExistsError, EmailOrPasswordError } from './auth.errors.js';
interface ParsedRegisterInput {
    name: string
    email: string
    password: string
}
interface ParsedLoginInput {
    email: string
    password: string
}

async function seccureInput(input: ParsedRegisterInput){
    const passwordHashed = await argon2.hash(input.password)
    return {
        name: input.name,
        email: input.email,
        passwordHash: passwordHashed
    }
}

export async function registerUser(input: ParsedRegisterInput) {
    const seccuredInput = await seccureInput(input)

    try {
        const createdUserId = await addUser(seccuredInput)
        return findUserById(createdUserId)
    } catch (error) {
        if ((error as QueryError).code === "ER_DUP_ENTRY") {
            throw new EmailAlreadyExistsError()
        }
        throw error
    }
}

export async function loginUser(input: ParsedLoginInput) {
    return await matchCredentials(input)
}

async function matchCredentials(input: ParsedLoginInput) {
    const foundUser = await findUserByEmail(input.email)
    if (!foundUser) throw new EmailOrPasswordError()

    const foundPassword = foundUser.password_hash
    const matchPasswords = await argon2.verify(foundPassword, input.password)
    if (!matchPasswords) throw new EmailOrPasswordError()

    return {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
    }
}