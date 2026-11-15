export enum ROLES {
    EMPLOYEE = "EMPLOYEE",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

export interface User {
    id: bigint
    name: string
    email: string
    passwordHash: string
    address: string | null
    role: ROLES
    deletedAt: Date | null
    updatedAt: Date
    createdAt: Date
}